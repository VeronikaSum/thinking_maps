import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from '../service/game.service';
import { CreateGameMapRequest } from 'src/types';
import { Game } from '../entity/game.entity';

@Controller('api/v1/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('/:id')
  async GetById(@Param() params): Promise<Game> {
    return await this.gameService.GetById(params.id);
  }
  @Post()
  async CreateNewGame(@Body() request: CreateGameMapRequest) {
    return this.gameService.createNewGame(request);
  }
}
