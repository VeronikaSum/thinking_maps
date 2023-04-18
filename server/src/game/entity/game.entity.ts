import { Group } from 'src/group/group.entity';
import { PlayedGame } from 'src/played-games/played-game.entity';
import { ThinkingMapEntity } from 'src/thinking-map/thinking-map.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => PlayedGame, (playedGame) => playedGame.game, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinColumn()
  playedGames: PlayedGame[];

  @Column()
  generatedCode: string;
}
