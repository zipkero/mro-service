import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginUserResponseDto } from '../user/user.dto';
import { TokenPayload } from '../token/token.type';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() userLoginDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    return await this.authService.login(userLoginDto);
  }

  @Post('/logout')
  async logout(@Headers('authorization') authHeader: string): Promise<void> {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new Error('AccessToken not provided');
    }
    return await this.authService.logout(accessToken);
  }

  @Get('/verify')
  async verify(
    @Headers('authorization') authHeader: string,
  ): Promise<TokenPayload> {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new Error('AccessToken not provided');
    }
    return await this.authService.verify(accessToken);
  }

  @Get('/refresh')
  async refresh(refreshToken: string): Promise<LoginUserResponseDto> {
    return await this.authService.refresh(refreshToken);
  }
}
