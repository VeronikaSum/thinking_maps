import { Module } from '@nestjs/common';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { ImageEntity } from './image.entity';
import { ImageService } from './service/image/image.service';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ThinkingMapEntity, ImageEntity])],
  providers: [ThinkingMapService, ImageService]
})
export class ImageModule { }
