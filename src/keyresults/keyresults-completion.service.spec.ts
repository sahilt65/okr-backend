import { KeyResultsCompletionService } from './key-results-completion.service';
import { Test, TestingModule } from '@nestjs/testing';
import { KeyResultsService } from './key-results.service';

describe('KeyresultsCompletionService', () => {
  let service: KeyResultsCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyResultsCompletionService],
    }).compile();

    service = module.get<KeyResultsCompletionService>(
      KeyResultsCompletionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const dummyKeyResult = {
    title: 'Dummy KeyResult',
    initialValue: 0,
    metrics: 'dummy Metrics',
  };

  describe('isCompleted', () => {
    it('should return true if current value and target value are same', () => {
      expect(
        service.isCompleted({
          ...dummyKeyResult,
          currentValue: 1,
          targetValue: 1,
          objectiveID: 1
        }),
      ).toBeTruthy();
    });

    it('should return false if current value and target value are not same', () => {
      expect(
        service.isCompleted({
          ...dummyKeyResult,
          currentValue: 1,
          targetValue: 3,
          objectiveID: 1
        }),
      ).toBeFalsy();
    });

    it('should return true if the current value is greater than target value', () => {
      expect(
        service.isCompleted({
          ...dummyKeyResult,
          currentValue: 5,
          targetValue: 3,
          objectiveID: 1
        }),
      ).toBeTruthy();
    });

    it('should return false if the current value is lesser than target value', () => {
      expect(
        service.isCompleted({
          ...dummyKeyResult,
          currentValue: 1,
          targetValue: 3,
          objectiveID: 1
        }),
      ).toBeFalsy();
    });
  });
});
