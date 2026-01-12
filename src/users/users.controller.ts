import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryUsersEmail } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService){}

  @Get('')
  async findAllUsers(@Query() query: QueryUsersEmail){
    return await this.usersService.findAllUsers(query.email);
  }
}
