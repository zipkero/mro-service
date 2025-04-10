import { UserRole } from '../common/enums/UserRole';
import { User } from '@prisma/client';

export type GetUserQuery =
  | { email: string }
  | { id: string }
  | { password: string };

export type GetUsersQuery = {
  name?: string;
  email?: string;
  role?: UserRole;
  page: number;
  pageSize: number;
};

export type GetUsersQueryResult = GetUsersQuery & {
  total: number;
  users: User[];
};
