import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { SearchWordType } from 'src/Types';
import { AxiosResponse } from 'axios';
import { ImageInformation, ImageRequest, SearchWordRequest, SimilarWordsResponseType } from '../apiTypes';
import { imageMapper, similarWordsMapper } from '../mapper';
import { link } from 'fs';

@Injectable()
export class ApiService {
    constructor(private http: HttpService) { }

    private apiKey = 'AIzaSyD2sAmVstEK0SyHQOEqLPYnkKdvq4BvBkc'
    private cx = 'd5088021f995c413e'

    async getSimilarWords(request: SearchWordRequest) {
        switch (request.searchWordType) {
            case SearchWordType.NOUN:
                {
                    return this.http.get(`https://api.datamuse.com/words?rel_jjb=${request.searchWord}&max=200&md=f`).pipe(
                        map(results => results.data),
                        map(data => similarWordsMapper(data)),
                        map(words => words.sort(function (a, b) { return +b.frequency - +a.frequency })),
                        map(results => results.slice(0, 24)))
                };
            case SearchWordType.ADJECTIVE:
                {
                    return this.http.get(`https://api.datamuse.com/words?rel_jja=${request.searchWord}&max=200&md=f`).pipe(
                        map(results => results.data),
                        map(data => similarWordsMapper(data)),
                        map(words => words.sort(function (a, b) { return +b.frequency - +a.frequency })),
                        map(results => results.slice(0, 24))
                    );
                }
            default:
                throw new BadRequestException(`${request.searchWordType} this word type is not implemented!`)
        }
    }

    async getImagesByKeywords(imageRequest: ImageRequest) {
        var links: string[] = this.buildLinks(imageRequest.keywords);
        var results: ImageInformation[] = [];

        for (var i = 0; i < links.length; i++) {
            const request = this.http.get(links[i])
            const res = await firstValueFrom(request);
            imageMapper(res.data.items, imageRequest.keywords[i]).forEach(image => results.push(image));
        }
        return results
    }

    private buildLinks(keywords: string[]) {
        var links: string[] = []

        for (var i = 0; i < keywords.length; i++) {
            links.push(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&q=${keywords[i]}&num=5&safe=high&cx=${this.cx}&searchType=image&rights=cc_publicdomain&alt=json`)
        }

        return links;
    }
}

