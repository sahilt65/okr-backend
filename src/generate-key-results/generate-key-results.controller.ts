import { Controller, Get, Query } from '@nestjs/common';
import { GenerateKeyResultsService } from './generate-key-results.service';

@Controller('generate-key-results')
export class GenerateKeyResultsController {
  constructor(private readonly service: GenerateKeyResultsService) {}
  @Get('')
  generateKeyResults(@Query('objective') objective: string) {
    return this.service.generateKeyResults(objective);
  }
}
