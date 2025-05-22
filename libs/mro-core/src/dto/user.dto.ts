import {
    IsDate,
    IsEmail,
    IsEnum,
    IsPhoneNumber,
    IsString, Matches, MaxLength, MinLength,
} from 'class-validator';
import {UserRole} from "../enums/UserRole";
import {JwtToken} from "../type/token.type";
import {OmitType, PickType, PartialType} from '@nestjs/mapped-types';

export class UserDto {
    id: string;
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @MinLength(8, {
        message: 'password too short',
    })
    @MaxLength(20, {
        message: 'password too long',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;
    @IsEnum(UserRole)
    role: UserRole;
    @IsPhoneNumber()
    phone: string;
    @IsDate()
    lastLogin: Date;
    @IsDate()
    createdAt: Date;
    @IsDate()
    updatedAt: Date;
}

export class CreateUserDto extends OmitType(UserDto,
    ['id', 'lastLogin', 'createdAt', 'updatedAt'] as const
) {
}

export class CreateUserResponseDto extends PickType(UserDto, ['email', 'name']) {
}

export class UpdateUserDto extends PartialType(UserDto) {
}

export class UpdateUserResponseDto extends CreateUserResponseDto {
}

export class LoginUserDto extends PickType(UserDto, ['email', 'password']) {
}

export type LoginUserResponseDto = JwtToken;

export type LogoutUserRequestDto = {
    accessToken: string;
};

export class GetUserDto extends PickType(UserDto, ['id', 'email', 'name', 'role']) {
}

export class GetUsersRequestDto {
    name?: string;
    email?: string;
    role?: UserRole;
    page: number;
    pageSize: number;
}

export class GetUsersResponseDto extends PickType(GetUsersRequestDto,
    ['page', 'pageSize']) {
    total: number;
    users: GetUserDto[];
}
