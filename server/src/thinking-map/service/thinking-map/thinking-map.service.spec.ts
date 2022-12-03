import { Test, TestingModule } from '@nestjs/testing';
import { ThinkingMapService } from './thinking-map.service';

describe('ThinkingMapService', () => {
  let service: ThinkingMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThinkingMapService],
    }).compile();

    service = module.get<ThinkingMapService>(ThinkingMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
