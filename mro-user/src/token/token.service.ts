import { Injectable } from '@nestjs/common';
import { JwtToken } from './token.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(userId: string): Promise<JwtToken> {
    const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
    const expirationTime = this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    );

    console.log('Secret Key:', secretKey);
    console.log('Expiration Time:', expirationTime);
    return {
      refreshToken: '',
      accessToken: '',
    };
  }
}
