import { UserRole } from '../common/enums/UserRole';
import { Role, User } from '@prisma/client';
import { GetUserDto } from './user.dto';

export class UserMapper {
  static toPrismaRole = (role: UserRole): Role => {
    return role;
  };

  static toRole = (role: Role): UserRole => {
    return role as unknown as UserRole;
  };

  static toGetUserDto = (user: User): GetUserDto => {
    return {
      ...user,
      role: UserMapper.toRole(user.role),
    };
  };

  static toGetUsersDto = (users: User[]): GetUserDto[] => {
    return users.map(UserMapper.toGetUserDto);
  };
}
