import { Module } from '@nestjs/common';
import { KeyResultsController } from './keyResults.controller';
import { KeyResultsService } from './key-results.service';
import { PrismaService } from '../prisma/prisma.service';
import { KeyResultsCompletionService } from './key-results-completion.service';

@Module({
  controllers: [KeyResultsController],
  providers: [KeyResultsService, PrismaService, KeyResultsCompletionService],
})
export class KeyresultsModule {}
