import {
  IsDate,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { JwtToken } from 'src/token/token.type';

export enum UserRole {
  admin = 'admin',
  user = 'user',
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

export type GetUserRequestDto = {
  page: number;
  pageSize: number;
};

export type GetUserResponseDto = Pick<
  GetUserRequestDto,
  'page' | 'pageSize'
> & {
  total: number;
  users: GetUserDto[];
};
