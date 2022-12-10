import { Injectable } from '@nestjs/common';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { GenerateMapRequest, ImageType } from 'src/types';
import mergeImages = require('merge-images');
import { Canvas, Image } from 'canvas';
import * as fs from 'fs';

@Injectable()
export class ThinkingMapService {
    constructor(@InjectRepository(ThinkingMapEntity) private thinkingMapRepository: Repository<ThinkingMapEntity>, @InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>) { }

    async getAll(): Promise<ThinkingMapEntity[]> {
        return await this.thinkingMapRepository.find()
    }

    async create(images: ImageType[], request: GenerateMapRequest) {
        // console.log(images);
        const entity = new ThinkingMapEntity();

        entity.mainWord = request.mainWord;
        entity.title = request.mapTitle;

        const content = await this.mergeMap(images).then(res => { return res })

        entity.content = content;

        const createdEntity = this.thinkingMapRepository.create(entity);
        // console.log(createdEntity)

        return createdEntity;


        // request.mapElements.forEach(element => {
        //     const image = new ImageEntity();
        //     image.searchWord = element.word;
        //     console.log(element.image)
        //     imageEntities.push(image);
        // });







        // map.mainImage = await this.imageRepository.save(map.mainImage);
        // map.mapImages = await this.imageRepository.save(map.mapImages);

        // const result = await this.thinkingMapRepository.save(map)
        // return result;
    }

    async mergeMap(images: ImageType[]): Promise<string> {
        // const imageLinks = request.links;
        // for (var i = 0; i < imageLinks.length; i++) {
        //     const imagePath = `./resources/images/image${i}.png`
        //     const writer = fs.createWriteStream(imagePath);
        //     const response = this.http.get(imageLinks[i], {
        //         responseType: 'stream',
        //     });
        //     const result = await firstValueFrom(response);
        //     result.data.pipe(writer);
        // }

        // console.log(images)
        console.log(images[0])
        console.log(images[0].path)

        const b64: string = await mergeImages([
            { src: './resources/bubble-map.png', x: 0, y: 0 },
            { src: images[0].path, x: 500, y: 500 },
            // { src: images[1].path, x: 490, y: 145 },
            // { src: images[2].path, x: 150, y: 284 },
            // { src: images[3].path, x: 165, y: 650 },
        ], {
            Image: Image,
            Canvas: Canvas,
        }).then(res => res);

        return b64;
        return '';

        // var base64Data = b64.replace(/^data:image\/png;base64,/, "");

        // await new Promise(function (resolve, reject) {
        //     fs.writeFile('./resources/images/temp.png', base64Data, 'base64', function (err) {
        //         if (err) reject(err);
        //         else resolve(base64Data);
        //     });
        // });

        // return await mergeImages([
        //     { src: './resources/images/temp.png', x: 0, y: 0 },
        //     { src: './resources/images/image4.png', x: 830, y: 650 },
        //     { src: './resources/images/image5.png', x: 820, y: 262 },
        //     { src: './resources/images/image6.png', x: 500, y: 850 },
        // ], {
        //     Image: Image,
        //     Canvas: Canvas,
        // })
    }
}
