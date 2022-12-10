import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity'
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    searchWord: string

    // @ManyToOne(() => ThinkingMapEntity, (map) => map.mapImages)
    // @JoinColumn()
    // map: ThinkingMapEntity
}

