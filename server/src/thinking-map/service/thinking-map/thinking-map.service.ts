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
        console.log(request)
        const entity = new ThinkingMapEntity();

        entity.mainWord = images[0].originalname;
        entity.title = request.mapTitle || Date.now() + "_map";

        const content = await this.mergeMap(images).then(res => { return res })

        entity.content = content;

        // var savedImages: ImageEntity[] = [];
        // for (var i = 0; i < images.length; i++) {
        //     const imageEntity = new ImageEntity();
        //     imageEntity.title = images[i].originalname;
        //     console.log(images[i])
        //     imageEntity.content = images[i].buffer.toString('base64')
        //     savedImages.push(await this.imageRepository.save(imageEntity))
        // }

        // entity.images = savedImages;
        return await this.thinkingMapRepository.save(entity);
    }

    async resizeImage(image: Express.Multer.File, path: string) {
        const readImage = await Jimp.read(image.path);
        readImage.resize(150, 150);

        await readImage.writeAsync(path);
    };

    // async resizeImages(images: Express.Multer.File[], path: string) {
    //     const promises = images.map((image) => {
    //         return Jimp.read(image.path)
    //             .then(res => {
    //                 return res
    //                     .resize(150, 150)
    //                     .writeAsync(path + image.filename);
    //             })
    //             .catch(console.error);
    //     });

    //     await Promise.all(promises);
    // }

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
            { src: paths[0], x: 425, y: 425 },
            { src: paths[1], x: 425, y: 75 },
            { src: paths[2], x: 100, y: 185 },
            { src: paths[3], x: 100, y: 575 },
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
            { src: paths[4], x: 755, y: 575 },
            { src: paths[5], x: 755, y: 200 },
            { src: paths[6], x: 425, y: 775 },
        ], {
            Image: Image,
            Canvas: Canvas,
        })
    }
}
