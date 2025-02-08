import { KeyResultsService } from './key-results.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateKeyresultDto } from './create-keyresult.dto';
import { mockDeep } from 'jest-mock-extended';

describe('keyResultService', () => {
  let service: KeyResultsService;
  const prismaService = mockDeep<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeyResultsService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<KeyResultsService>(KeyResultsService);
  });

  describe('fetchUnique', () => {
    it('should return an unique key result', async () => {
      const keyResult: CreateKeyresultDto = {
        title: 'Dummy Key Result',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metric',
        objectiveID: 1,
      };

      prismaService.keyResult.findUnique.mockResolvedValue({
        id: 1,
        ...keyResult,
      });
      const response = await service.fetchUnique(1);

      expect(response).toEqual({ ...keyResult, id: 1 });
    });
  });

  describe('create', () => {
    it('should return created keyresult with id', async () => {
      const dummyKeyResult: CreateKeyresultDto = {
        title: 'dummy keyresult',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metrics',
        objectiveID: 1,
      };

      const mockKeyResult = {
        id: 1,
        ...dummyKeyResult,
      };

      prismaService.keyResult.create.mockResolvedValue(mockKeyResult);

      const response = await service.create(dummyKeyResult);
      expect(response).toEqual(mockKeyResult);
    });
  });

  describe('update', () => {
    const dummyUpdatedKeyResult: CreateKeyresultDto = {
      title: 'dummy updated keyresult',
      initialValue: 1,
      currentValue: 2,
      targetValue: 3,
      metrics: 'dummy metrics',
      objectiveID: 1,
    };

    const mockKeyResult = {
      id: 1,
      ...dummyUpdatedKeyResult,
    };
    it('should call update method of prisma service', async () => {
      //Arrange
      //Act
      await service.update('1', dummyUpdatedKeyResult);
      //Assert
      expect(prismaService.keyResult.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dummyUpdatedKeyResult,
      });
    });
    it('should return a updated key Result', async () => {
      //Arrange
      prismaService.keyResult.update.mockResolvedValue(mockKeyResult);
      //Act
      const response = await service.update('2', dummyUpdatedKeyResult);
      //Assert
      expect(response).toEqual(mockKeyResult);
    });
  });

  describe('delete', () => {
    it('should call delete method of prisma service', async () => {
      //Arrange
      //Act
      await prismaService.keyResult.delete({ where: { id: 1 } });
      //Assert
      expect(prismaService.keyResult.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should delete the key result with give id and return the deleted key result', async () => {
      //Arrange
      const dummyDeletedKeyResult: CreateKeyresultDto & { id: number } = {
        id: 1,
        title: 'dummy updated keyresult',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metrics',
        objectiveID: 1,
      };

      prismaService.keyResult.delete.mockResolvedValue(dummyDeletedKeyResult);

      //Act
      const response = await service.delete('1');

      //Assert
      expect(response).toEqual(dummyDeletedKeyResult);
    });
  });
});
