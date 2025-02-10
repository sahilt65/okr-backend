import { Test, TestingModule } from '@nestjs/testing';
import { GenerateKeyResultsService } from './generate-key-results.service';

describe('GenerateKeyResultsService', () => {
  let service: GenerateKeyResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateKeyResultsService],
    }).compile();

    service = module.get<GenerateKeyResultsService>(GenerateKeyResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
