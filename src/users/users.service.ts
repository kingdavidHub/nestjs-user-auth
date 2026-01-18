import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/client';
import { BcryptHelper } from '../helpers/bcryptHelper';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptHelper: BcryptHelper,
  ) {}

  async findAllUsers(userEmail: string) {
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
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }

  async updateUserById(id: number, body: Prisma.UserUpdateInput) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: await this.bcryptHelper.hashPassword(body.password as string),
        email: body.email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  // TODO: Update this service to soft delete implementation
  async deleteUserById(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully',
      user: deletedUser,
    };
  }
}
