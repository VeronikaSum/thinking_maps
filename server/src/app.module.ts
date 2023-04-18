import { Module } from '@nestjs/common';
import { ThinkingMapModule } from './thinking-map/thinking-map.module';
import { ImageModule } from './image/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ChildModule } from './child/child.module';
import { GameModule } from './game/game.module';
import { PlayedGameModule } from './played-games/played-game.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThinkingMapModule,
    ImageModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'thinkingMapDB.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ApiModule,
    UserModule,
    GroupModule,
    ChildModule,
    GameModule,
    PlayedGameModule,
    FileModule,
  ],
})
export class AppModule {}
