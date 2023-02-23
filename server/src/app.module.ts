import { Module } from '@nestjs/common';
import { ThinkingMapModule } from './thinking-map/thinking-map.module';
import { ImageModule } from './image/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ChildModule } from './child/child.module';

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
    }),
    ApiModule,
    UserModule,
    GroupModule,
    ChildModule,
  ],
})
export class AppModule {}
