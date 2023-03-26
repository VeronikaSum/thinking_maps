import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Group } from 'src/group/group.entity';
import { ChildRequest } from 'src/types';
import { ChildService } from '../service/child.service';
import { Child } from '../child.entity';

@Controller('/api/v1/child')
export class ChildController {
  constructor(private childService: ChildService) {}

  @Get('/:id')
  async GetById(@Param() params): Promise<Child> {
    return await this.childService.GetById(params.id);
  }

  @Get('/group/:id')
  async GetAllByGroupId(@Param() params): Promise<Child[]> {
    return await this.childService.GetByGroupId(params.id);
  }

  @Post()
  createChild(@Body() request: ChildRequest) {
    this.childService.Create(request);
  }
}
