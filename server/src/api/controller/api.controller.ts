import { Controller, Get, Query } from '@nestjs/common';
import { ImageRequest, SearchWordRequest } from '../apiTypes';
import { ApiService } from '../service/api.service';

@Controller('api/v1/api')
export class ApiController {
    constructor(private apiService: ApiService) { }

    @Get('/words')
    async GetSimilarWords(@Query() request: SearchWordRequest) {
        if (request) {
            return await this.apiService.getSimilarWords(request)
        }
        return null;
    }
}
