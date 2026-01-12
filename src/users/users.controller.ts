import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService){}

  @Get('')
  async findAllUsers(){
    return await this.usersService.findAllUsers();
  }
}
