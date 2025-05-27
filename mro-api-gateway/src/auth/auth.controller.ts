import {
  Controller,
  Post,
  UseGuards,
  Headers,
  Body,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService, LoginResponse } from './auth.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { TokenPayload } from 'mro-core';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<LoginResponse> {
    return await this.authService.login(email, password);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logout(@Headers('authorization') authHeader: string): Promise<void> {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('AccessToken not provided');
    }
    await this.authService.logout(accessToken);
  }

  @Get('/verify')
  @UseGuards(AuthGuard)
  async verify(
    @Headers('authorization') authHeader: string,
  ): Promise<TokenPayload> {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('AccessToken not provided');
    }
    return await this.authService.verifyToken(accessToken);
  }

  @Post('/refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<LoginResponse> {
    return await this.authService.refreshToken(refreshToken);
  }
}
