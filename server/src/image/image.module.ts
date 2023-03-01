import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { ImageService } from 'src/image/service/image/image.service';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { ImageController } from './controller/image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThinkingMapEntity, ImageEntity])],
  providers: [ThinkingMapService, ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
