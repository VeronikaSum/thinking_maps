import { Module } from '@nestjs/common';
import { ThinkingMapModule } from './thinking-map/thinking-map.module';
import { ImageModule } from './image/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
})
export class AppModule {}
