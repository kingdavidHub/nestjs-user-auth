import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [PrismaModule, HelpersModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
