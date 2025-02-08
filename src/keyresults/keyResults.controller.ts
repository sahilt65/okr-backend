import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { KeyResultsService } from './key-results.service';
import { CreateKeyresultDto } from './create-keyresult.dto';
import { CreateObjectiveDto } from '../objectives/create-objective.dto';
import { KeyResultsCompletionService } from './key-results-completion.service';

@Controller('key-result')
export class KeyResultsController {
  constructor(
    private keyResultService: KeyResultsService,
    private keyResultCompletionService: KeyResultsCompletionService,
  ) {}

  @Get('/')
  getKeyResults() {
    return this.keyResultService.getAll();
  }

  @Get(':id')
  fetchUnique(@Param('id') id: string) {
    return this.keyResultService.fetchUnique(Number(id));
  }

  @Post('/')
  createKeyResult(@Body() dto: CreateKeyresultDto) {
    console.log(dto);
    return this.keyResultService.create(dto);
  }

  @Patch(':id')
  updateKeyResult(@Param('id') id: string, @Body() dto: CreateKeyresultDto) {
    return this.keyResultService.update(id, dto);
  }

  @Delete(':id')
  deleteKeyResult(@Param('id') id: string) {
    return this.keyResultService.delete(id);
  }

  @Post('/is-keyresult-completed')
  isComplete(@Body() dto: CreateKeyresultDto) {
    return this.keyResultCompletionService.isCompleted(dto);
  }
}
