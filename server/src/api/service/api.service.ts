import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { ImageInformation, ImageRequest, SearchWordRequest, SimilarWord } from '../apiTypes';
import { imageMapper, similarWordsMapper } from '../mapper';

@Injectable()
export class ApiService {
    constructor(private http: HttpService) { }

    private apiKey = 'AIzaSyD2sAmVstEK0SyHQOEqLPYnkKdvq4BvBkc'
    private cx = 'd5088021f995c413e'

    private key = "1b28f9e8f42a4f77aaa43ed461a6d2c4";
    private location = "westeurope";

    async translateToEnText(input: string) {
        try {
            const req = this.http.post('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=lt&to=en',
                [
                    {
                        text: input,
                    }
                ],
                {
                    headers: {
                        'Ocp-Apim-Subscription-Key': this.key,
                        'Ocp-Apim-Subscription-Region': this.location,
                        'Content-type': 'application/json',
                    },
                }
            );

            const res = await firstValueFrom(req);
            return res.data[0].translations[0].text;
        } catch (error) {
            console.log(error);
        }
    };

    async translateToLtText(inputs: string[]) {
        const req = this.http.post('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=lt',
            inputs.map(input => ({
                text: input
            }))
            , {
                headers: {
                    'Ocp-Apim-Subscription-Key': this.key,
                    'Ocp-Apim-Subscription-Region': this.location,
                    'Content-type': 'application/json',
                },
            }
        );

        const res = await firstValueFrom(req);
        return res.data.map(trans => trans.translations[0].text);
    };

    async getSimilarWords(request: SearchWordRequest) {
        var mainWord: string = await this.translateToEnText(request.searchWord);
        const req = this.http.get(`https://api.datamuse.com/words?rel_jjb=${mainWord}&max=200&md=f`);

        const res = await firstValueFrom(req);

        const similarWords: SimilarWord[] = similarWordsMapper(res.data);
        similarWords.sort((a, b) => +b.frequency - +a.frequency);

        const wordsToTranslate: string[] = [];

        similarWords.forEach(word => wordsToTranslate.push(word.word))

        const translatedWords = await this.translateToLtText(wordsToTranslate);
        for (var i = 0; i < translatedWords.length; i++) {
            similarWords[i].word = translatedWords[i];
        }

        return similarWords;

    }

    async getImagesByKeywords(imageRequest: ImageRequest) {
        console.log(imageRequest)
        var links: string[] = [];
        const translatedMainWord: string = await this.translateToEnText(imageRequest.mainWord).then(res => res)
        links.push(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&q=${translatedMainWord}&num=1&safe=active&cx=${this.cx}&searchType=image&imgType=clipart`);
        this.buildLinks(imageRequest.keywords, translatedMainWord).forEach(link => links.push(link));
        console.log(translatedMainWord)
        var results: ImageInformation[] = [];

        for (var i = 0; i < links.length; i++) {
            const request = this.http.get(links[i])
            const res = await firstValueFrom(request);
            imageMapper(res.data.items, imageRequest.keywords[i]).forEach(image => results.push(image));
        }
        return results
    }

    private buildLinks(keywords: string[], translatedMainWord: string) {
        var links: string[] = []

        for (var i = 0; i < keywords.length; i++) {
            links.push(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&q=${keywords[i]}}&num=1&cx=${this.cx}&searchType=image&imgType=clipart`)
        }

        return links;
    }
}

function axios(dataUrl: string) {
    throw new Error('Function not implemented.');
}

