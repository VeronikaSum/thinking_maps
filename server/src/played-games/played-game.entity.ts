import { Game } from 'src/game/entity/game.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class PlayedGame {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  playedAt: string;

  @Column()
  playTime: string;

  @Column()
  mistakes: string;

  @Column()
  cluesCount: number;

  @ManyToOne(() => Game, (game) => game.id, { cascade: true })
  game: Game;

  @Column()
  playerId: string;
}
