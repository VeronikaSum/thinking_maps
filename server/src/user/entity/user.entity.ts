import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  institution: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: string;
}
