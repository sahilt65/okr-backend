import { Module } from '@nestjs/common';
import { GenerateKeyResultsController } from './generate-key-results.controller';
import { GenerateKeyResultsService } from './generate-key-results.service';
import { ConfigService } from '@nestjs/config';
import { ObjectivesService } from '../objectives/objectives.service';
import { KeyResultsService } from '../keyresults/key-results.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GenerateKeyResultsController],
  providers: [GenerateKeyResultsService, ConfigService, ObjectivesService, KeyResultsService, PrismaService],
})
export class GenerateKeyResultsModule {}
