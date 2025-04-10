import { Injectable } from '@nestjs/common';
import { JwtPayload, JwtToken, TokenPayload, TokenType } from './token.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(tokenPayload: TokenPayload): Promise<JwtToken> {
    const accessSecretKey = this.configService.get<string>(
      'JWT_ACCESS_SECRET_KEY',
    );
    const accessExpirationTime = this.configService.get<string>(
      'JWT_ACCESS_EXPIRATION_TIME',
    );
    const refreshSecretKey = this.configService.get<string>(
      'JWT_REFRESH_SECRET_KEY',
    );
    const refreshExpirationTime = this.configService.get<string>(
      'JWT_REFRESH_EXPIRATION_TIME',
    );

    const jwtPayload: JwtPayload = {
      sub: tokenPayload.id,
      email: tokenPayload.email,
      role: tokenPayload.role,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: accessSecretKey,
      expiresIn: accessExpirationTime,
    });

    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: refreshSecretKey,
      expiresIn: refreshExpirationTime,
    });

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
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: secretKey,
      });
    } catch (e) {
      throw new Error('Token verification failed: ', e);
    }
  }

  async refreshToken(token: string): Promise<JwtToken> {
    const payload = await this.verifyToken(token, 'refresh');
    const newAccessToken = await this.generateToken({
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    });
    return newAccessToken;
  }
}
