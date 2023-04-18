import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayedGameService } from './played-game.service';
import { PlayedGame } from './played-game.entity';
import { PlayedGameRequest } from 'src/types';

@Controller('api/v1/played-game')
export class PlayedGameController {
  constructor(private playedGameService: PlayedGameService) {}

  @Get('/:id')
  async GetById(@Param() params): Promise<PlayedGame> {
    return await this.playedGameService.GetById(params.id);
  }

  @Get(':gameId/child/:id')
  async GetAllByPlayerId(@Param() params): Promise<PlayedGame[]> {
    return await this.playedGameService.GetByPlayerId(params.gameId, params.id);
  }

  @Post()
  createGroup(@Body() request: PlayedGameRequest) {
    this.playedGameService.Create(request);
  }
}
