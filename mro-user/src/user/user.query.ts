import { UserRole } from '../common/enums/UserRole';

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
