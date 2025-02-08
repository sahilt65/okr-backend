import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesService } from './objectives.service';
import { mockDeep } from 'jest-mock-extended';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

describe('ObjectivesService', () => {
  let service: ObjectivesService;
  let prismaService: PrismaService = mockDeep<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectivesService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<ObjectivesService>(ObjectivesService);
  });

  describe('get Objectives', () => {
    it('should call find many method of prisma service', async () => {
      await service.getObjectives();
      expect(prismaService.objective.findMany).toHaveBeenCalled();
    });

    it('should return all objectives', () => {
      // prismaService.objective.
    });
  });
});
