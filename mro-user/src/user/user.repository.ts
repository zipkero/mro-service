import { Prisma, User } from '@prisma/client';
import { GetUserRequestDto, GetUsersRequestDto } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(getUserRequestDto: GetUsersRequestDto): Promise<User[]> {
    const { page, pageSize, name, email, role } = getUserRequestDto;
    const skip = (page - 1) * pageSize;

    return await this.prisma.user.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      where: {
        OR: [
          name
            ? {
                name: { contains: getUserRequestDto.name, mode: 'insensitive' },
              }
            : {},
          email
            ? {
                email: {
                  contains: getUserRequestDto.email,
                  mode: 'insensitive',
                },
              }
            : {},
          role ? { role: getUserRequestDto.role } : {},
        ],
      },
    });
  }

  async findUser(where: GetUserRequestDto): Promise<User | null> {
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
