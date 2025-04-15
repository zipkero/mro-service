import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { ApiConfigService } from '../../config/api.config';

export type User = {
  id: string;
  email: string;
  role: string;
};

export type RequestWithUser = Request & {
  user?: User;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly apiConfigService: ApiConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const [type, token] = request.headers.authorization?.split(' ') || [];
    if (type !== 'Bearer' || !token) {
      return false;
    }
    const response = await axios.post<User>(
      this.apiConfigService.getAuthEndpoint('/verify'),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) {
      return false;
    }
    request.user = response.data;
    return true;
  }
}
