import { Controller, Get, Param } from '@nestjs/common';
import { ImageEntity } from '../image.entity';
import { ImageService } from '../service/image/image.service';

@Controller('api/v1/image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/:id')
  async GetById(@Param() params): Promise<ImageEntity[]> {
    return await this.imageService.GetByThinkingMapId(params.id);
  }
}
