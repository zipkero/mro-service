import { Body, Controller } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from 'mro-core';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.register(createUserDto);
  }
}
