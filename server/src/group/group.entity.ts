import { Child } from 'src/child/child.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(() => User, (owner) => owner.authId, { cascade: true })
  owner: User;

  @OneToMany(() => Child, (child) => child.group, {
    cascade: ['insert', 'update'],
  })
  child: Child[];
}
