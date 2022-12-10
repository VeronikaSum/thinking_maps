import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

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
}


