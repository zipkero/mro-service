import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { TokenPayload, JwtToken, JwtPayload, TokenType } from 'mro-core';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(tokenPayload: TokenPayload): Promise<JwtToken> {
    const accessSecretKey = this.configService.get<string>(
      'JWT_ACCESS_SECRET_KEY',
    );
    const accessExpirationTime = this.configService.get<number>(
      'JWT_ACCESS_EXPIRATION_TIME',
    );
    const refreshSecretKey = this.configService.get<string>(
      'JWT_REFRESH_SECRET_KEY',
    );
    const refreshExpirationTime = this.configService.get<number>(
      'JWT_REFRESH_EXPIRATION_TIME',
    );

    const jwtPayload: JwtPayload = {
      sub: tokenPayload.id,
      email: tokenPayload.email,
      role: tokenPayload.role,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: accessSecretKey,
      expiresIn: Number(accessExpirationTime),
    });

    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: refreshSecretKey,
      expiresIn: Number(refreshExpirationTime),
    });

    const redisClient = this.redisService.getClient();

    const accessRedisKey = `access:${tokenPayload.id}`;
    const refreshRedisKey = `refresh:${tokenPayload.id}`;

    await Promise.all([
      redisClient.setex(
        accessRedisKey,
        Number(accessExpirationTime),
        accessToken,
      ),
      redisClient.setex(
        refreshRedisKey,
        Number(refreshExpirationTime),
        refreshToken,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string, tokenType: TokenType): Promise<JwtPayload> {
    const secretKey =
      tokenType === 'access'
        ? this.configService.get<string>('JWT_ACCESS_SECRET_KEY')
        : this.configService.get<string>('JWT_REFRESH_SECRET_KEY');
    try {
      const jwtPayload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: secretKey,
      });

      const redisClient = this.redisService.getClient();
      const redisKey = `${tokenType}:${jwtPayload.sub}`;
      const redisToken = await redisClient.get(redisKey);
      if (!redisToken) {
        throw new Error('Token not found in Redis');
      }
      if (redisToken !== token) {
        throw new Error('Token mismatch with Redis');
      }

      return jwtPayload;
    } catch (e) {
      throw new Error('Token verification failed: ', e);
    }
  }

  async removeTokens(sub: string): Promise<void> {
    const redisClient = this.redisService.getClient();
    const accessRedisKey = `access:${sub}`;
    const refreshRedisKey = `refresh:${sub}`;

    await Promise.all([
      redisClient.del(accessRedisKey),
      redisClient.del(refreshRedisKey),
    ]);
  }

  async refreshToken(token: string): Promise<JwtToken> {
    const payload = await this.verifyToken(token, 'refresh');

    await this.removeTokens(payload.sub);

    return await this.generateToken({
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    });
  }
}
