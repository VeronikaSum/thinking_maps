import { Controller, Post, Get, Body } from '@nestjs/common';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';

@Controller('api/v1/thinking-map')
export class ThinkingMapController {
    constructor(private thinkingMapService: ThinkingMapService) { }

    @Get()
    async GetAll(): Promise<ThinkingMapEntity[]> {
        return await this.thinkingMapService.getAll();
    }

    @Post()
    async Create(@Body() map: ThinkingMapEntity): Promise<ThinkingMapEntity> {
        return await this.thinkingMapService.create(map);
    }
}
