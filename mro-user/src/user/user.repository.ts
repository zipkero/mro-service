import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetUserQuery, GetUsersQuery, GetUsersQueryResult } from './user.query';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(
    getUsersQuery: GetUsersQuery,
  ): Promise<GetUsersQueryResult> {
    const { page, pageSize, name, email, role } = getUsersQuery;
    const skip = (page - 1) * pageSize;

    const where: Prisma.UserWhereInput = {};
    if (name || email || role) {
      where.OR = [
        name
          ? {
              name: {
                contains: getUsersQuery.name,
                mode: Prisma.QueryMode.insensitive,
              },
            }
          : {},
        email
          ? {
              email: {
                contains: getUsersQuery.email,
                mode: Prisma.QueryMode.insensitive,
              },
            }
          : {},
        role ? { role: getUsersQuery.role } : {},
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        where: where,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      ...getUsersQuery,
      total,
      users,
    };
  }

  async findUser(where: GetUserQuery): Promise<User | null> {
    throw new HttpException('Not implemented', 501);
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
