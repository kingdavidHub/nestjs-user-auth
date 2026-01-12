import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [PrismaModule, HelpersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
