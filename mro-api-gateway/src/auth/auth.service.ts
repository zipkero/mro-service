import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiConfigService } from '../config/api.config';
import { TokenPayload } from 'mro-core';

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

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      this.apiConfigService.getAuthEndpoint('/refresh'),
      {
        refreshToken,
      },
      {},
    );
    return response.data;
  }

  async verifyToken(accessToken: string): Promise<TokenPayload> {
    const response = await axios.get<TokenPayload>(
      this.apiConfigService.getAuthEndpoint('/verify'),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  }
}
