import { Group } from 'src/group/group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @ManyToOne((type) => Group, (group) => group.id, { cascade: true })
  group: Group;
}
