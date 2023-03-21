import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameMapRequest } from 'src/types';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { Game } from '../entity/game.entity';
import { ThinkingMapService } from 'src/thinking-map/service/thinking-map/thinking-map.service';
import { GroupService } from 'src/group/service/group.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly thinkingMapService: ThinkingMapService,
  ) {}

  async GetById(id: any): Promise<Game> {
    return await this.gameRepository.findOne({
      relations: {
        map: true,
      },
      where: {
        id: id,
      },
    });
  }

  async GetByGeneratedCode(code: any): Promise<Game> {
    return await this.gameRepository.findOne({
      relations: {
        map: true,
      },
      where: {
        generatedCode: code,
      },
    });
  }

  async createNewGame(request: CreateGameMapRequest) {
    const game = new Game();
    game.owner = await this.userService.GetByAuthId(request.userAuthId);
    game.group = await this.groupService.GetById(request.groupId);
    game.map = await this.thinkingMapService.GetById(+request.mapId);

    // const generatedCode = this.findUniqueGeneratedCode();

    // while (this.findUniqueGeneratedCode() !== null) {
    //     game.generatedCode = await generatedCode;
    // }
    game.generatedCode = await this.findUniqueGeneratedCode();

    return await this.gameRepository.save(game);
  }

  private async findUniqueGeneratedCode(): Promise<string> {
    const generatedCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    if ((await this.gameRepository.countBy({ generatedCode })) === 0) {
      return generatedCode;
    }

    return null;
  }
}
