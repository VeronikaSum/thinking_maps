import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity'
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    contentFull: string

    @Column()
    contentResized: string

    @Column()
    mimeType: string

    @ManyToOne(type => ThinkingMapEntity, map => map.id, { cascade: true,})
    map: ThinkingMapEntity
}

