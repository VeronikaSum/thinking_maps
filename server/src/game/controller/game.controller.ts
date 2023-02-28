import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from '../service/game.service';
import { CreateGameMapRequest } from 'src/types';

@Controller('api/v1/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  async CreateNewGame(@Body() request: CreateGameMapRequest) {
    return this.gameService.createNewGame(request);
  }
}
