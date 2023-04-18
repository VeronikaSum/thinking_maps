import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { UserService } from 'src/user/service/user.service';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { GroupService } from 'src/group/service/group.service';
import { ThinkingMapModule } from 'src/thinking-map/thinking-map.module';
import { GroupModule } from 'src/group/group.module';
import { Game } from './entity/game.entity';
import { ImageService } from 'src/image/service/image/image.service';
import { ImageEntity } from 'src/image/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      User,
      ThinkingMapEntity,
      Group,
      ImageEntity,
    ]),
  ],
  providers: [
    GameService,
    UserService,
    ThinkingMapService,
    GroupService,
    ImageService,
  ],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
