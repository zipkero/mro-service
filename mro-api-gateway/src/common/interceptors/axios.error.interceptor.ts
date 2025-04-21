import axios, { AxiosError } from 'axios';
import { HttpException } from '@nestjs/common';

export function setupAxiosErrorInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const errorData = error.response.data as Record<string, any>;

        throw new HttpException(errorData, error.response.status);
      }
      throw error;
    },
  );
}
