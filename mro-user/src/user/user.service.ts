import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  GetUserDto,
  GetUserRequestDto,
  GetUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  UpdateUserDto,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly tokenService: TokenService) {}
  async login(userLoginDto: LoginUserDto): Promise<LoginUserResponseDto> {
    throw new Error('Method not implemented.');
  }

  async getAllUsers(
    getUserRequestDto: GetUserRequestDto,
  ): Promise<GetUserResponseDto> {
    throw new Error('Method not implemented.');
  }
  async getMe(): Promise<GetUserDto> {
    throw new Error('Method not implemented.');
  }
  async getUserById(id: string): Promise<GetUserDto> {
    throw new Error('Method not implemented.');
  }
  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async refresh(): Promise<LoginUserResponseDto> {
    throw new Error('Method not implemented.');
  }
  async register(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    throw new Error('Method not implemented.');
  }
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<LoginUserResponseDto> {
    throw new Error('Method not implemented.');
  }
  async deleteUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
