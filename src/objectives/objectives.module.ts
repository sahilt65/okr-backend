import { Module } from '@nestjs/common';
import { ObjectivesController } from './objectives.controller.js';
import { ObjectivesService } from './objectives.service.js';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ObjectivesController],
  providers: [ObjectivesService, PrismaService],
})
export class ObjectivesModule {}
