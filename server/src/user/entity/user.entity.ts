import { group } from 'console';
import { Group } from 'src/group/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => Group, (group) => group.owner, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinColumn()
  groups: Group[];
}
