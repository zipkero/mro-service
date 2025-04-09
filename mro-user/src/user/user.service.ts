import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  GetUserDto,
  GetUsersRequestDto,
  GetUsersResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  UpdateUserDto,
} from './user.dto';
import bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepo: UserRepository,
  ) {}

  async login(userLoginDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const hashedPassword = await bcrypt.hash(userLoginDto.password, 12);
    const user = await this.userRepo.findUser({
      email: userLoginDto.email,
      password: hashedPassword,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.tokenService.generateToken({
      email: user.email,
      id: user.id,
      role: user.role,
    });
  }

  async getAllUsers(
    getUserRequestDto: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    throw new Error('Method not implemented.');
  }

  async getMe(): Promise<GetUserDto> {
    throw new Error('Method not implemented.');
  }

  async getUserById(id: string): Promise<GetUserDto> {
    throw new Error('Method not implemented.');
  }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    throw new Error('Method not implemented.');
  }

  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async refresh(): Promise<LoginUserResponseDto> {
    throw new Error('Method not implemented.');
  }

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepo.findUser({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userRepo.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      email: user.email,
      name: user.name,
    };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const updateUser = await this.userRepo.updateUser(id, updateUserDto);
    return null;
  }

  async deleteUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
