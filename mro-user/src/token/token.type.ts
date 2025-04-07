export type JwtToken = {
  accessToken: string;
  refreshToken: string;
};

export type TokenPayload = {
  userId: string;
  email: string;
};

export type JwtPayload = {
  sub: string;
  exp: number;
  iat?: number;
  iss?: string;
};
