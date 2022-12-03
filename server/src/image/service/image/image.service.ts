import { Injectable } from '@nestjs/common';
import { ImageEntity } from 'src/image/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(ImageEntity) private imageRespository: Repository<ImageEntity>) { }

    async getAll(): Promise<ImageEntity[]> {
        return await this.imageRespository.find()
    }

    async create(image: ImageEntity): Promise<ImageEntity> {
        return await this.imageRespository.save(image);
    }
}
