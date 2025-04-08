import { UserRole } from 'src/user/user.dto';

export type TokenType = 'access' | 'refresh';

export type JwtToken = {
  accessToken: string;
  refreshToken: string;
};

export type TokenPayload = {
  userId: string;
  email: string;
  role: UserRole;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
  exp?: number;
  iat?: number;
  iss?: string;
};
