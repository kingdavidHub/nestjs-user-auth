import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '../generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptHelper } from '../helpers/bcryptHelper';

// prisma we use it for the types
// while the prism service is for the db operations
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
    // Logic to register user
    if (!user.email || !user.password) {
      throw new HttpException('Missing required fields', 400);
    }

    // check if user exists
    const userExits = await this.checkUserExits(user.email);

    if (userExits) {
      throw new ConflictException({
        message: 'User already exists',
        field: 'email',
      });
    }

    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        // password: await this.bcryptHelper.hashPassword(user.password),
      },
    });
  }
}
