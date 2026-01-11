import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '../generated/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() body: Prisma.UserCreateInput) {
    this.authService.registerUser(body);
  }
}
