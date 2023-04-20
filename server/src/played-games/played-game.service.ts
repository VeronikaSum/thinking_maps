import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayedGameRequest } from 'src/types';
import { PlayedGame } from './played-game.entity';
import { Repository } from 'typeorm';
import { GameService } from 'src/game/service/game.service';

@Injectable()
export class PlayedGameService {
  constructor(
    @InjectRepository(PlayedGame)
    private playedGameRepository: Repository<PlayedGame>,
    private readonly gameService: GameService,
  ) {}

  async GetById(id: any): Promise<PlayedGame> {
    return await this.playedGameRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async GetByPlayerId(gameId: number, id: string): Promise<PlayedGame[]> {
    return await this.playedGameRepository.find({
      where: {
        game: {
          id: gameId,
        },
        playerId: id,
      },
    });
  }

  async Create(request: PlayedGameRequest) {
    const playedGame = new PlayedGame();

    playedGame.cluesCount = request.cluesCount;
    playedGame.mistakes = request.mistakes.join('; ');
    playedGame.playTime = request.playTime;

    playedGame.playerId = request.playerId;
    playedGame.game = await this.gameService.GetById(request.gameId);

    this.playedGameRepository.insert(playedGame);
  }
}
