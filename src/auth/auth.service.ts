import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptHelper } from '../helpers/bcryptHelper';
import { RegisterDto } from './dto';

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

  async registerUser(user: RegisterDto) {
    const userExits = await this.checkUserExits(user.email);

    if (userExits) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

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
  }

  async loginUser(user: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare password
    const passwordValid = await this.bcryptHelper.comparePasswords(
      user.password,
      existingUser.password,
    );

    if (!passwordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Return success response (exclude password)
    return {
      message: `Welcome ${existingUser.email.split('@')[0]}`,
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    };
  }
}
