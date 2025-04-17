import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from 'mro-core';
import { ApiConfigService } from '../config/api.config';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly apiConfigService: ApiConfigService) {}

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const response = await axios.post<CreateUserResponseDto>(
      this.apiConfigService.getUserEndpoint('/register'),
      createUserDto,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }
}
