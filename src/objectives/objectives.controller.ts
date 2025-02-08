import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectivesService } from './objectives.service.js';
import { CreateObjectiveDto } from './create-objective.dto';
import { CreateKeyresultDto } from '../keyresults/create-keyresult.dto';

@Controller('objectives')
export class ObjectivesController {
  constructor(private objectivesService: ObjectivesService) {}

  @Get('/')
  getObjectives() {
    return this.objectivesService.getObjectives();
  }

  @Get('keyresults')
  getObjectivesAndKeyResults() {
    return this.objectivesService.getObjectivesAndKeyResults();
  }

  @Post('/')
  createObjective(@Body() dto: CreateObjectiveDto) {
    return this.objectivesService.createObjective(dto);
  }

  @Patch(':id')
  updateObjective(@Param('id') id: string, @Body() dto: CreateObjectiveDto) {
    return this.objectivesService.updateObjective(id, dto);
  }

  @Delete(':id')
  deleteObjective(@Param('id') id: string) {
    return this.objectivesService.deleteObjective(id);
  }
}
