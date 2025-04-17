import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { UserRepository } from '../user/user.repository';
import { LoginUserDto, LoginUserResponseDto } from 'mro-core';
import * as bcrypt from 'bcryptjs';
import { UserMapper } from '../user/user.mapper';
import { TokenPayload } from 'mro-core';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepo: UserRepository,
  ) {}

  async login(userLoginDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.userRepo.findUser({
      email: userLoginDto.email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(userLoginDto.password, user.password))) {
      throw new ConflictException('Invalid credentials');
    }
    const jwtToken = await this.tokenService.generateToken({
      id: user.id,
      email: user.email,
      role: UserMapper.toRole(user.role),
    });

    await this.userRepo.updateUser(user.id, {
      lastLogin: new Date(),
    });

    return jwtToken;
  }

  async logout(accessToken: string): Promise<void> {
    const tokenPayload = await this.tokenService.verifyToken(
      accessToken,
      'access',
    );

    if (!tokenPayload) {
      throw new NotFoundException('Token not found');
    }
    await this.tokenService.removeTokens(tokenPayload.sub);
  }

  async verify(accessToken: string): Promise<TokenPayload> {
    const jwtPayload = await this.tokenService.verifyToken(
      accessToken,
      'access',
    );
    if (!jwtPayload) {
      throw new NotFoundException('Token not found');
    }
    return {
      id: jwtPayload.sub,
      email: jwtPayload.email,
      role: jwtPayload.role,
    };
  }

  async refresh(refreshToken: string): Promise<LoginUserResponseDto> {
    const jwtToken = await this.tokenService.refreshToken(refreshToken);
    if (!jwtToken) {
      throw new NotFoundException('Token not found');
    }
    return {
      accessToken: jwtToken.accessToken,
      refreshToken: jwtToken.refreshToken,
    };
  }
}
