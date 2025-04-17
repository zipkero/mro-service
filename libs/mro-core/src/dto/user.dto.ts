import {
  IsDate,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import {UserRole} from "../enums/UserRole";
import {JwtToken} from "../type/token.type";

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

export type UpdateUserResponseDto = CreateUserResponseDto;

export type LoginUserDto = Pick<UserDto, 'email' | 'password'>;

export type LoginUserResponseDto = JwtToken;

export type LogoutUserRequestDto = {
  accessToken: string;
};

export type GetUserDto = Pick<UserDto, 'id' | 'email' | 'name' | 'role'>;

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
