import { Controller, Post, Get, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { GenerateMapRequest, ImageType } from 'src/types';

@Controller('api/v1/thinking-map')
export class ThinkingMapController {
    constructor(private thinkingMapService: ThinkingMapService) { }

    @Get()
    async GetAll(): Promise<ThinkingMapEntity[]> {
        return await this.thinkingMapService.getAll();
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images', 7, { dest: './resources/images' }))
    async createThinkingMap(@UploadedFiles() images: ImageType[], @Body() request: GenerateMapRequest) {
        // console.log(images)
        return await this.thinkingMapService.create(images, request);
    }
}
