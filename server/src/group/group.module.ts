import { Module } from '@nestjs/common';
import { GroupController } from './controller/group.controller';
import { UserService } from 'src/user/service/user.service';
import { GroupService } from './service/group.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'src/user/entity/user.entity';
import { Group } from './group.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User]), UserModule],
  controllers: [GroupController],
  providers: [GroupService, UserService],
  exports: [GroupService],
})
export class GroupModule {}
