import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryUsersEmail, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Get('')
  async findAllUsers(@Query() query: QueryUsersEmail) {
    return await this.userService.findAllUsers(query.email);
  }

  @Get(':id')
  async findUserById(id: ParseIntPipe) {
    return await this.userService.findUserById(+id);
  }

  @Patch(':id')
  async updateUserById(id: ParseIntPipe, @Body() body: UpdateUserDto) {
    return await this.userService.updateUserById(+id, body);
  }

  @Delete(':id')
  async deleteUserById(id: ParseIntPipe) {
    return await this.userService.deleteUserById(+id);
  }
}
