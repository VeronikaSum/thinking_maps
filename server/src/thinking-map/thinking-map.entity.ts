import { ImageEntity } from 'src/image/image.entity'
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class ThinkingMapEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    mainWord: string

    @CreateDateColumn()
    createdAt: string

    @Column()
    content: string

    @OneToMany(type => ImageEntity, image => image.map, { cascade: ['insert', 'update'] })
    @JoinColumn()
    images: ImageEntity[]
}


