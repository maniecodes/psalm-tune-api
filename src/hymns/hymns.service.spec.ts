import { Test, TestingModule } from '@nestjs/testing';
import { HymnsService } from './hymns.service';

describe('HymnsService', () => {
  let service: HymnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HymnsService],
    }).compile();

    service = module.get<HymnsService>(HymnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
