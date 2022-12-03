import { Test, TestingModule } from '@nestjs/testing';
import { ThinkingMapController } from './thinking-map.controller';

describe('ThinkingMapController', () => {
  let controller: ThinkingMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThinkingMapController],
    }).compile();

    controller = module.get<ThinkingMapController>(ThinkingMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
