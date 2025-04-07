import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { JwtToken } from 'src/token/token.type';

@Injectable()
export class UserService {
  constructor(private readonly tokenService: TokenService) {}
  async login(): Promise<JwtToken> {
    const userId = '12345'; // Replace with actual user ID
    const token = await this.tokenService.generateToken(userId);
    return token;
  }
}
