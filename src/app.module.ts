import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ObjectivesModule } from './objectives/objectives.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './prisma/prisma.service';
import { KeyresultsModule } from './keyresults/keyresults.module';
import { GenerateKeyResultsModule } from './generate-key-results/generate-key-results.module';

@Module({
  imports: [
    HelloWorldModule,
    ObjectivesModule,
    DatabaseModule,
    KeyresultsModule,
    GenerateKeyResultsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
