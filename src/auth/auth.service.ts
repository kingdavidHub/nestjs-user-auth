import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '../generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptHelper } from '../helpers/bcryptHelper';

@Injectable()
export class AuthService {
  constructor(
    private bcryptHelper: BcryptHelper,
    private prisma: PrismaService,
  ) {}

  async checkUserExits(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !!user;
  }

  async registerUser(user: Prisma.UserCreateInput) {
    if (!user.email || !user.password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userExits = await this.checkUserExits(user.email);

    if (userExits) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: await this.bcryptHelper.hashPassword(user.password),
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
