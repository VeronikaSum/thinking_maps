import { Injectable } from '@nestjs/common';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from 'src/image/image.entity';

@Injectable()
export class ThinkingMapService {
    constructor(@InjectRepository(ThinkingMapEntity) private thinkingMapRepository: Repository<ThinkingMapEntity>, @InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>) { }

    async getAll(): Promise<ThinkingMapEntity[]> {
        return await this.thinkingMapRepository.find({
            relations: {
                mainImage: true,
                mapImages: true
            },
        })
    }

    async create(map: ThinkingMapEntity): Promise<ThinkingMapEntity> {
        map.mainImage = await this.imageRepository.save(map.mainImage);
        map.mapImages = await this.imageRepository.save(map.mapImages);

        const result = await this.thinkingMapRepository.save(map)
        return result;
    }
}
