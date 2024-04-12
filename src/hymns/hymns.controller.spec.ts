import { Test, TestingModule } from '@nestjs/testing';
import { HymnsController } from './hymns.controller';

describe('HymnsController', () => {
  let controller: HymnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HymnsController],
    }).compile();

    controller = module.get<HymnsController>(HymnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
