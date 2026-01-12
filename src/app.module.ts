import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [AuthModule, PrismaModule, HelpersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
