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
    contentType: string

    @Column()
    mimeType: string
}

