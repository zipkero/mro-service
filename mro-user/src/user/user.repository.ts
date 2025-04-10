import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetUserQuery, GetUsersQuery } from './user.query';

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(getUsersQuery: GetUsersQuery): Promise<User[]> {
    const { page, pageSize, name, email, role } = getUsersQuery;
    const skip = (page - 1) * pageSize;

    return await this.prisma.user.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      where: {
        OR: [
          name
            ? {
                name: { contains: getUsersQuery.name, mode: 'insensitive' },
              }
            : {},
          email
            ? {
                email: {
                  contains: getUsersQuery.email,
                  mode: 'insensitive',
                },
              }
            : {},
          role ? { role: getUsersQuery.role } : {},
        ],
      },
    });
  }

  async findUser(where: GetUserQuery): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
