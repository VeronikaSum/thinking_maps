import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from '../service/group.service';
import { request } from 'express';
import { Group } from '../group.entity';
import { GroupRequest } from 'src/types';

@Controller('api/v1/group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/user/:id')
  async GetAllByUserId(@Param() params): Promise<Group[]> {
    return await this.groupService.GetByAuthId(params.id);
  }

  @Get('/:id')
  async GetById(@Param() params): Promise<Group> {
    return await this.groupService.GetById(params.id);
  }

  @Post()
  createGroup(@Body() request: GroupRequest) {
    this.groupService.Create(request);
  }
}
