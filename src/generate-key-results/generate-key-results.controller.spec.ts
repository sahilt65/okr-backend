import { Test, TestingModule } from '@nestjs/testing';
import { GenerateKeyResultsController } from './generate-key-results.controller';

describe('GenerateKeyResultsController', () => {
  let controller: GenerateKeyResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateKeyResultsController],
    }).compile();

    controller = module.get<GenerateKeyResultsController>(
      GenerateKeyResultsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
