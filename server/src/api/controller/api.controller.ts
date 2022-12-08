import { Controller, Get, Query } from '@nestjs/common';
import { ImageRequest, SearchWordRequest } from '../apiTypes';
import { ApiService } from '../service/api.service';

@Controller('api/v1/api')
export class ApiController {
    constructor(private apiService: ApiService) { }

    @Get('/images')
    async GetImagesByKeywords(@Query() request: ImageRequest) {
        if (request) {
            return await this.apiService.getImagesByKeywords(request)
        }
        return null;
    }

    @Get('/words')
    async GetSimilarWords(@Query() request: SearchWordRequest) {
        if (request) {
            return await this.apiService.getSimilarWords(request)
        }
        return null;
    }

    @Get('/map')
    async GetMergedMap(@Query() request: { links: string[] }) {
        if (request.links.length != 0) {
            return await this.apiService.mergeMap(request);;
        }
        return '';
    }
}
