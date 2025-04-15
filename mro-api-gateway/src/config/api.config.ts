import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  getAuthEndpoint(path: string): string {
    const authUrl = this.configService.get<string>('API_AUTH_URL');
    return `${authUrl}${path}`;
  }

  getUserEndpoint(path: string): string {
    const userUrl = this.configService.get<string>('API_USER_URL');
    return `${userUrl}${path}`;
  }

  getProductEndpoint(path: string): string {
    const productUrl = this.configService.get<string>('API_PRODUCT_URL');
    return `${productUrl}${path}`;
  }

  getOrderEndpoint(path: string): string {
    const orderUrl = this.configService.get<string>('API_ORDER_URL');
    return `${orderUrl}${path}`;
  }
}
