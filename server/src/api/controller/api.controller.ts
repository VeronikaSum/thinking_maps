import { Body, Controller, Get } from '@nestjs/common';
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
    async GetSimilarWords(@Body() request: SearchWordRequest) {
        return await this.apiService.getSimilarWords(request)
    }
}
