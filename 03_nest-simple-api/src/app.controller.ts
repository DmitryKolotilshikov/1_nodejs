import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { IUser } from './Models/User';
import { IUserQuery } from './Models/UserQuery';
import { UsersService } from './users.service';

@Controller('users')
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUserByParams(@Query() query: IUserQuery): IUser[] {
    const keys = Object.keys(query);

    if (keys.length === 0) return this.usersService.getUsers();

    return this.usersService.getUserByQuery(query);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): IUser {
    try {
      return this.usersService.getUserById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
