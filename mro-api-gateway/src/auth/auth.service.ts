import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { API_BASE_URLS, API_PATHS, getApiUrl } from '../config/config';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      getApiUrl(API_BASE_URLS.AUTH, API_PATHS.AUTH.LOGIN),
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
      getApiUrl(API_BASE_URLS.AUTH, API_PATHS.AUTH.LOGOUT),
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
