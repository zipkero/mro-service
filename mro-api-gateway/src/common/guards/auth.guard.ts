import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

export type User = {
  id: string;
  email: string;
  role: string;
};

export type RequestWithUser = Request & {
  user?: User;
};

export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const [type, token] = request.headers.authorization?.split(' ') || [];
    if (type !== 'Bearer' || !token) {
      return false;
    }
    const response = await axios.get<User>(
      'http://localhost:3000/api/v1/user/verify',
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
