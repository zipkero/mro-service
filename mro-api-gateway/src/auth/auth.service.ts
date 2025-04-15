import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiConfigService } from '../config/api.config';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly apiConfigService: ApiConfigService) {}

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      this.apiConfigService.getAuthEndpoint('/login'),
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  async logout(accessToken: string): Promise<void> {
    await axios.post(
      this.apiConfigService.getAuthEndpoint('/logout'),
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
  }
}
