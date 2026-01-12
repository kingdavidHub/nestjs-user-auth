import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(userEmail: string) {
    try {

      // find a specific users
      if (userEmail) {
        const user = await this.prisma.user.findUnique({
          where: { email: userEmail },
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        });
        return user;
      }

      // returns all users
      const [users, totalUsers] = await Promise.all([
        this.prisma.user.findMany({
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        }),
        this.prisma.user.count(),
      ]);

      return {
        totalUsers,
        users,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
