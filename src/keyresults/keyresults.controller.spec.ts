import { Test, TestingModule } from '@nestjs/testing';
import { KeyResultsController } from './keyResults.controller';
import mock = jest.mock;
import { mockDeep } from 'jest-mock-extended';
import { KeyResultsService } from './key-results.service';
import { KeyResultsCompletionService } from './key-results-completion.service';

describe('KeyResultsController', () => {
  let controller: KeyResultsController;
  const service = mockDeep<KeyResultsService>();
  const completionService = mockDeep<KeyResultsCompletionService>();
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: KeyResultsService, useValue: service },
        { provide: KeyResultsCompletionService, useValue: completionService },
      ],
      controllers: [KeyResultsController],
    }).compile();

    controller = module.get<KeyResultsController>(KeyResultsController);
  });

  describe('fetchUnique', () => {
    it('should call fetch Unique method of Key Result Services', async () => {
      await controller.fetchUnique('1');
      expect(service.fetchUnique).toHaveBeenCalledWith(1);
    });

    it('should return a key result with given id', async () => {
      //Arrange
      const dummyKeyResult = {
        id: 1,
        title: 'Dummy Key Result',
        initialValue: 1,
        targetValue: 2,
        currentValue: 3,
        metrics: 'string',
        objectiveID: 1,
      };
      service.fetchUnique.mockResolvedValue(dummyKeyResult);
      //Act
      const response = await controller.fetchUnique('1');
      //Assert
      expect(response).toEqual(dummyKeyResult);
    });
  });
});
