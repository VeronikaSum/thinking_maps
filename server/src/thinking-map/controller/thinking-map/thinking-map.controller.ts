import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { GenerateMapRequest } from 'src/types';

@Controller('api/v1/thinking-map')
export class ThinkingMapController {
  constructor(private thinkingMapService: ThinkingMapService) {}

  @Get('/:id')
  async GetById(@Param() params): Promise<ThinkingMapEntity> {
    return await this.thinkingMapService.GetById(params.id);
  }

  @Get()
  async GetAll(): Promise<ThinkingMapEntity[]> {
    return await this.thinkingMapService.getAll();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 13, { dest: './resources/images' }),
  )
  async createThinkingMap(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() request: GenerateMapRequest,
  ) {
    return await this.thinkingMapService.create(images, request);
  }
}
