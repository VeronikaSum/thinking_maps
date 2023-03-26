import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { UserRequest } from 'src/types';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async GetByAuthId(@Param() params): Promise<User | null> {
    return await this.userService.GetByAuthId(params.id);
  }

  @Post()
  createUser(@Body() request: UserRequest) {
    this.userService.create(request);
  }
}
