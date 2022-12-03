import { ImageEntity } from 'src/image/image.entity'
import { Entity, OneToOne, JoinColumn, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class ThinkingMapEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    mainWord: string

    @Column()
    wordType: string

    @CreateDateColumn()
    createdAt: String

    @OneToMany(() => ImageEntity, image => image.map)
    @JoinColumn()
    mapImages: ImageEntity[]

    @OneToOne(() => ImageEntity, image => image.id)
    @JoinColumn()
    mainImage: ImageEntity



}


