import { Module } from '@nestjs/common';
import { ThinkingMapService } from './service/thinking-map/thinking-map.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageEntity } from 'src/image/image.entity';
import { ImageService } from 'src/image/service/image/image.service';
import { ThinkingMapEntity } from './thinking-map.entity';
import { ThinkingMapController } from './controller/thinking-map/thinking-map.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ThinkingMapEntity, ImageEntity])],
    controllers: [ThinkingMapController],
    providers: [ThinkingMapService, ImageService]
})
export class ThinkingMapModule { }
