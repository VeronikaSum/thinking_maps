import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { query } from 'express';
import { ImageRequest, SearchWordRequest } from '../apiTypes';
import { ApiService } from '../service/api.service';

@Controller('api/v1/api')
export class ApiController {
    constructor(private apiService: ApiService) { }

    @Get('/images')
    async GetImagesByKeywords(@Body() keywords: ImageRequest) {
        return await this.apiService.getImagesByKeywords(keywords)
    }

    @Get('/words')
    async GetSimilarWords(@Query() query: SearchWordRequest) {
        return await this.apiService.getSimilarWords(query)
    }
}
