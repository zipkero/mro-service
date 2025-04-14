import { Controller, Post, UseGuards, Headers, Body } from '@nestjs/common';
import { AuthService, LoginResponse } from './auth.service';
import { AuthGuard } from '../common/guards/auth.guard';

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
      throw new Error('AccessToken not provided');
    }
    await this.authService.logout(accessToken);
  }
}
