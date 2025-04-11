import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  GetUserDto,
  GetUsersRequestDto,
  GetUsersResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(
    @Body() userLoginDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    return await this.userService.login(userLoginDto);
  }

  @Post('/logout')
  async logout(@Headers('authorization') authHeader: string): Promise<void> {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new Error('AccessToken not provided');
    }
    return await this.userService.logout(accessToken);
  }

  @Get()
  async getAllUsers(
    @Body() getUserRequestDto: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    return await this.userService.getAllUsers(getUserRequestDto);
  }

  @Get('/me')
  async getMe(): Promise<GetUserDto> {
    return await this.userService.getMe();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserDto> {
    return await this.userService.getUserById(id);
  }

  @Get('/refresh')
  async refresh(): Promise<LoginUserResponseDto> {
    return await this.userService.refresh();
  }

  @Post()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.register(createUserDto);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() udateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userService.updateUser(id, udateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
