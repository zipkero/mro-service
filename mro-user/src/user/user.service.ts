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
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
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

  async getAllUsers(
    getUserRequestDto: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    const queryResult = await this.userRepo.findAllUsers(getUserRequestDto);
    return {
      ...queryResult,
      users: UserMapper.toGetUsersDto(queryResult.users),
    };
  }

  async getMe(): Promise<GetUserDto> {
    throw new Error('Method not implemented.');
  }

  async getUserById(id: string): Promise<GetUserDto> {
    const user = await this.userRepo.findUser({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toGetUserDto(user);
  }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    const user = await this.userRepo.findUser({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toGetUserDto(user);
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
    const user = await this.userRepo.updateUser(id, updateUserDto);
    return UserMapper.toGetUserDto(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepo.deleteUser(id);
  }
}
