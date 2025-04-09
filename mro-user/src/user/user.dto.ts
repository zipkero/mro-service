import {
  IsDate,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { JwtToken } from 'src/token/token.type';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  id: string;
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  password: string;
  @IsEnum(UserRole)
  role: UserRole;
  @IsPhoneNumber()
  hphone: string;
  @IsDate()
  lastLogin: Date;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}

export type CreateUserDto = Omit<
  UserDto,
  'id' | 'lastLogin' | 'createdAt' | 'updatedAt'
>;

export type CreateUserResponseDto = Pick<UserDto, 'email' | 'name'>;

export type UpdateUserDto = Partial<UserDto>;

export type LoginUserDto = Pick<UserDto, 'email' | 'password'>;

export type LoginUserResponseDto = JwtToken;

export type GetUserDto = Pick<UserDto, 'id' | 'email' | 'name' | 'role'>;

export type GetUserRequestDto =
  | { email: string }
  | { id: string }
  | { password: string };

export type GetUsersRequestDto = {
  name?: string;
  email?: string;
  role?: UserRole;
  page: number;
  pageSize: number;
};

export type GetUsersResponseDto = Pick<
  GetUsersRequestDto,
  'page' | 'pageSize'
> & {
  total: number;
  users: GetUserDto[];
};
