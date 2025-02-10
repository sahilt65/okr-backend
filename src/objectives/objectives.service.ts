import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObjectiveDto } from './create-objective.dto';

@Injectable()
export class ObjectivesService {
  constructor(private prisma: PrismaService) {}

  getObjectives() {
    return this.prisma.objective.findMany({
      include: {
        keyResults: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  getObjectivesAndKeyResults() {
    return this.prisma.objective.findMany({
      include: {
        keyResults: true,
      },
    });
  }

  createObjective(dto: CreateObjectiveDto) {
    return this.prisma.objective.create({
      data: dto,
    });
  }

  updateObjective(id: string, dto: CreateObjectiveDto) {
    return this.prisma.objective.update({
      data: dto,
      where: {
        id: parseInt(id),
      },
    });
  }

  deleteObjective(id: string) {
    return this.prisma.objective.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}
