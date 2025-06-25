import { Role, User } from '@prisma/client';
import { GetUserDto, UserRole } from 'mro-core';

export class UserMapper {
  static toPrismaRole = (role: UserRole): Role => {
    return role;
  };

  static toRole = (role: Role): UserRole => {
    return role as unknown as UserRole;
  };

  static toGetUserDto = (user: User): GetUserDto => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: UserMapper.toRole(user.role),
    };
  };

  static toGetUsersDto = (users: User[]): GetUserDto[] => {
    return users.map(UserMapper.toGetUserDto);
  };
}
