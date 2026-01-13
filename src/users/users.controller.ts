import { Controller, Delete, Get, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryUsersEmail } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService){}

  @Get('')
  async findAllUsers(@Query() query: QueryUsersEmail){
    return await this.userService.findAllUsers(query.email);
  }

  @Get(':id')
  async findUserById(id: ParseIntPipe) {
    return await this.userService.findUserById(+id);
  }

  @Delete(':id')
  async deleteUserById(id:ParseIntPipe){
    return await this.userService.deleteUserById(+id);
  }
}
