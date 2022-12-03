import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity'
import { Entity, OneToOne, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    link: string

    @Column()
    height: number

    @Column()
    width: number

    @Column()
    searchWord: string

    @ManyToOne(() => ThinkingMapEntity, (map) => map.mapImages)
    @JoinColumn()
    map: ThinkingMapEntity
}

