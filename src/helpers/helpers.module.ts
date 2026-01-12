import { Module } from '@nestjs/common';
import { BcryptHelper } from './bcryptHelper';

@Module({
  providers: [BcryptHelper],
  exports: [BcryptHelper],
})
export class HelpersModule {}
