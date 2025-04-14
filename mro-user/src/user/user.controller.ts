import {
  Body,
  Controller,
  Delete,
  Get,
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
  UpdateUserDto,
  UpdateUserResponseDto,
} from './user.dto';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Body() getUserRequestDto: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    return await this.userService.getAllUsers(getUserRequestDto);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserDto> {
    return await this.userService.getUserById(id);
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
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
