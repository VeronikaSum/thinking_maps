import { Injectable } from '@nestjs/common';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { GenerateMapRequest, ImageType } from 'src/types';
import mergeImages = require('merge-images');
import { Canvas, Image } from 'canvas';
import * as fs from 'fs';
import sharp = require('sharp');
import Jimp = require('jimp');

@Injectable()
export class ThinkingMapService {
    constructor(@InjectRepository(ThinkingMapEntity) private thinkingMapRepository: Repository<ThinkingMapEntity>, @InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>) { }

    async getAll(): Promise<ThinkingMapEntity[]> {
        return await this.thinkingMapRepository.find()
    }

    async create(images: Express.Multer.File[], request: GenerateMapRequest) {
        const entity = new ThinkingMapEntity();

        entity.mainWord = request.mainWord;
        entity.title = request.mapTitle;

        const content = await this.mergeMap(images).then(res => { return res })

        entity.content = content;

        const createdEntity = this.thinkingMapRepository.create(entity);
        console.log(createdEntity)

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

    async resizeImage(image: Express.Multer.File, path: string) {
        const readImage = await Jimp.read(image.path);
        readImage.resize(100, 100);

        await readImage.writeAsync(path);
        console.log('aaaaaaaaaa')
    };

    async resizeImages(images: Express.Multer.File[], path: string) {
        const promises = images.map((image) => {
            return Jimp.read(image.path)
                .then(res => {
                    return res
                        .resize(150, 150)
                        .writeAsync(path + image.filename);
                })
                .catch(console.error);
        });

        await Promise.all(promises);
    }

    async mergeMap(images: Express.Multer.File[]): Promise<string> {
        console.log(images)
        const paths: string[] = [];
        const resizedImagePath = './resources/images/resized/';

        for (var i = 0; i < images.length; i++) {
            const resizedImagePath = './resources/images/resized/' + images[i].filename;
            const extention = images[i].mimetype === 'image/jpeg' ? '.jpeg' : '.png'

            console.log('images[i]', images[i].filename)
            await this.resizeImage(images[i], resizedImagePath);
            console.log('images[i]', images[i].filename)
            paths.push(resizedImagePath);
        }

        const b64: string = await mergeImages([
            { src: './resources/bubble-map.png', x: 0, y: 0 },
            { src: paths[0], x: 500, y: 500 },
            { src: paths[1], x: 490, y: 145 },
            { src: paths[2], x: 150, y: 284 },
            { src: paths[3], x: 165, y: 650 },
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
            { src: paths[4], x: 830, y: 650 },
            { src: paths[5], x: 820, y: 262 },
            { src: paths[6], x: 500, y: 850 },
        ], {
            Image: Image,
            Canvas: Canvas,
        })
    }
}
