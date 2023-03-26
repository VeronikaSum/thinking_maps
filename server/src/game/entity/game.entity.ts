import { Group } from 'src/group/group.entity';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.id, { cascade: true })
  group: Group;

  @ManyToOne(() => ThinkingMapEntity, (map) => map.id, { cascade: true })
  map: ThinkingMapEntity;

  @ManyToOne(() => User, (owner) => owner.authId, { cascade: true })
  owner: User;

  @Column()
  generatedCode: string;
}
