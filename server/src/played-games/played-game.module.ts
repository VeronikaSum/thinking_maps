import { Module } from '@nestjs/common';
import { PlayedGameController } from './played-game.controller';
import { PlayedGameService } from './played-game.service';
import { GameService } from 'src/game/service/game.service';
import { ChildService } from 'src/child/service/child.service';
import { UserService } from 'src/user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayedGame } from './played-game.entity';
import { User } from 'src/user/entity/user.entity';
import { Child } from 'src/child/child.entity';
import { Game } from 'src/game/entity/game.entity';
import { GroupModule } from 'src/group/group.module';
import { GameModule } from 'src/game/game.module';
import { ThinkingMapModule } from 'src/thinking-map/thinking-map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayedGame, User, Game, Child]),
    GroupModule,
    GameModule,
    ThinkingMapModule,
  ],
  controllers: [PlayedGameController],
  providers: [PlayedGameService, GameService, ChildService, UserService],
})
export class PlayedGameModule {}
