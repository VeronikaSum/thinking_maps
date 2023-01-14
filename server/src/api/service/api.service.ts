import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { SearchWordRequest, SimilarWord } from '../apiTypes';
import { similarWordsMapper } from '../mapper';

@Injectable()
export class ApiService {
    constructor(private http: HttpService) { }

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
                        'Ocp-Apim-Subscription-Key': process.env.TRANSLATOR_API_KEY,
                        'Ocp-Apim-Subscription-Region': process.env.TRANSLATOR_REGION,
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
        console.log(inputs)
        const req = this.http.post('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=lt',
            inputs.map(input => ({
                text: input
            }))
            , {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.TRANSLATOR_API_KEY,
                    'Ocp-Apim-Subscription-Region': process.env.TRANSLATOR_REGION,
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

        console.log(request)
        console.log(similarWords)

        return similarWords;

    }
}

