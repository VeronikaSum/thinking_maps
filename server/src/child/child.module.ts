import { Module } from '@nestjs/common';
import { ChildService } from './service/child.service';
import { ChildController } from './controller/child.controller';
import { GroupService } from 'src/group/service/group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';
import { Child } from './child.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Child, Group]), UserModule],
  providers: [ChildService, GroupService],
  controllers: [ChildController],
})
export class ChildModule {}
