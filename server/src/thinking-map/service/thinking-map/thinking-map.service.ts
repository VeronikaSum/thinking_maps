import { Injectable } from '@nestjs/common';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { GenerateMapRequest, ImageType } from 'src/types';
import mergeImages = require('merge-images');
import { Canvas, Image } from 'canvas';
import * as fs from 'fs';
import Jimp = require('jimp');

@Injectable()
export class ThinkingMapService {
  constructor(
    @InjectRepository(ThinkingMapEntity)
    private thinkingMapRepository: Repository<ThinkingMapEntity>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  async getAll(): Promise<ThinkingMapEntity[]> {
    return await this.thinkingMapRepository.find();
  }

  async create(images: Express.Multer.File[], request: GenerateMapRequest) {
    const entity = new ThinkingMapEntity();

    entity.mainWord = images[0].originalname;
    entity.title = request.mapTitle || Date.now() + '_map';

    const content = await this.mergeMap(images).then((res) => {
      return res;
    });

    entity.content = content;

    const paths = [];

    var savedImages: ImageEntity[] = [];
    for (var i = 0; i < images.length; i++) {
      const imageEntity = new ImageEntity();
      if (images[i].originalname.endsWith('0')) {
        imageEntity.isCorrect = false;
        images[i].originalname = images[i].originalname.slice(
          0,
          images[i].originalname.length - 1,
        );
      }
      imageEntity.title = images[i].originalname;

      const resizedPath = './resources/images/resized/';
      imageEntity.contentResized = fs.readFileSync(
        resizedPath + images[i].filename,
        { encoding: 'base64' },
      );
      imageEntity.contentFull = fs.readFileSync(images[i].path, {
        encoding: 'base64',
      });
      paths.push(images[i].path);
      paths.push(resizedPath + images[i].filename);
      imageEntity.mimeType = images[i].mimetype;
      savedImages.push(imageEntity);
    }

    entity.images = savedImages;
    const map = await this.thinkingMapRepository.save(entity);
    paths.forEach((path) =>
      fs.unlink(path, (err) => {
        if (err) throw err;
      }),
    );

    return map;
  }

  async resizeImage(image: Express.Multer.File, path: string) {
    const readImage = await Jimp.read(image.path);
    readImage.resize(150, 150);

    await readImage.writeAsync(path);
  }

  async mergeMap(images: Express.Multer.File[]): Promise<string> {
    const paths: string[] = [];

    for (var i = 0; i < images.length; i++) {
      const resizedImagePath =
        './resources/images/resized/' + images[i].filename;

      await this.resizeImage(images[i], resizedImagePath);
      paths.push(resizedImagePath);
    }

    const b64: string = await mergeImages(
      [
        { src: './resources/bubble-map.png', x: 0, y: 0 },
        { src: paths[0], x: 425, y: 425 },
        { src: paths[1], x: 425, y: 75 },
        { src: paths[2], x: 100, y: 185 },
        { src: paths[3], x: 100, y: 575 },
      ],
      {
        Image: Image,
        Canvas: Canvas,
      },
    ).then((res) => res);

    var base64Data = b64.replace(/^data:image\/png;base64,/, '');

    await new Promise(function (resolve, reject) {
      fs.writeFile(
        './resources/images/temp.png',
        base64Data,
        'base64',
        function (err) {
          if (err) reject(err);
          else resolve(base64Data);
        },
      );
    });

    return await mergeImages(
      [
        { src: './resources/images/temp.png', x: 0, y: 0 },
        { src: paths[4], x: 755, y: 575 },
        { src: paths[5], x: 755, y: 200 },
        { src: paths[6], x: 425, y: 775 },
      ],
      {
        Image: Image,
        Canvas: Canvas,
      },
    );
  }
}
