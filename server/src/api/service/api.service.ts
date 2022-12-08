import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { ImageInformation, ImageRequest, SearchWordRequest, SimilarWord } from '../apiTypes';
import { imageMapper, similarWordsMapper } from '../mapper';
import mergeImages = require('merge-images');
import { Canvas, Image } from 'canvas';
import * as fs from 'fs';

@Injectable()
export class ApiService {
    constructor(private http: HttpService) { }

    private apiKey = 'AIzaSyD2sAmVstEK0SyHQOEqLPYnkKdvq4BvBkc'
    private cx = 'd5088021f995c413e'

    private key = "1b28f9e8f42a4f77aaa43ed461a6d2c4";
    private location = "westeurope";


    async mergeMap(request: { links: string[] }): Promise<string> {
        const imageLinks = request.links;
        for (var i = 0; i < imageLinks.length; i++) {
            const imagePath = `./resources/images/image${i}.png`
            const writer = fs.createWriteStream(imagePath);
            const response = this.http.get(imageLinks[i], {
                responseType: 'stream',
            });
            const result = await firstValueFrom(response);
            result.data.pipe(writer);
        }

        const b64: string = await mergeImages([
            { src: './resources/bubble-map.png', x: 0, y: 0 },
            { src: './resources/images/image0.png', x: 500, y: 500 },
            { src: './resources/images/image1.png', x: 490, y: 145 },
            { src: './resources/images/image2.png', x: 150, y: 284 },
            { src: './resources/images/image3.png', x: 165, y: 650 },
        ], {
            Image: Image,
            Canvas: Canvas,
        }).then(res => res);

        var base64Data = b64.replace(/^data:image\/png;base64,/, "");

        await new Promise(function (resolve, reject) {
            fs.writeFile('./resources/images/temp.png', base64Data, 'base64', function (err) {
                if (err) reject(err);
                else resolve(base64Data);
            });
        });

        return await mergeImages([
            { src: './resources/images/temp.png', x: 0, y: 0 },
            { src: './resources/images/image4.png', x: 830, y: 650 },
            { src: './resources/images/image5.png', x: 820, y: 262 },
            { src: './resources/images/image6.png', x: 500, y: 850 },
        ], {
            Image: Image,
            Canvas: Canvas,
        })
    }

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

