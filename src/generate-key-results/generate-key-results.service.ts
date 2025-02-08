import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ObjectivesService } from '../objectives/objectives.service';
import { KeyResultsService } from '../keyresults/key-results.service';
import path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { AzureChatOpenAI } from '@langchain/openai';
import { CreateKeyresultDto } from '../keyresults/create-keyresult.dto';

@Injectable()
export class GenerateKeyResultsService {
  constructor(
    private readonly objectiveService: ObjectivesService,
    private readonly keyResultService: KeyResultsService,
    private readonly configService: ConfigService,
  ) {}

  async generateKeyResults(objectiveTitle: string) {
    const objective = z.object({
      title: z.string(),
      keyResults: z.array(
        z.object({
          title: z.string(),
          initialValue: z.number(),
          currentValue: z.number(),
          targetValue: z.number(),
          metrics: z.string(),
          objectiveID: z.number(),
        }),
      ),
    });
    const model = new AzureChatOpenAI({
      temperature: 0.15,
      azureOpenAIApiInstanceName: this.configService.get<string>(
        'MODEL_INSTANCE_NAME',
      ),
      azureOpenAIApiDeploymentName:
        this.configService.get<string>('MODEL_NAME'),
      maxTokens: 1000,
      azureOpenAIApiKey: this.configService.get<string>(
        'AZURE_OPEN_AI_API_KEY',
      ),
      model: 'gpt-4o',
      azureOpenAIApiVersion: '2024-08-01-preview',
    });
    const modelWithStructuredResponseAsObjective =
      model.withStructuredOutput(objective);
    const response = await modelWithStructuredResponseAsObjective.invoke([
      {
        role: 'system',
        content:
          'You are an AI model that generates key results for a given objective title.\n\n' +
          'Each key result must be structured as an array with the following format:\n\n' +
          '[\n' +
          '  {\n' +
          '    "title": "string",\n' +
          '    "initialValue": number,\n' +
          '    "currentValue": number,\n' +
          '    "targetValue": number,\n' +
          '    "metrics": "string",\n' +
          '    "objectiveID": number\n' +
          '  }\n' +
          ']\n\n' +
          'Ensure that the generated key results:\n' +
          '- Are relevant to the given objective title.\n' +
          '- Contain meaningful values.\n' +
          '- Follow the correct structure.',
      },

      {
        role: 'user',
        content: `Title of Objective is : ${objectiveTitle}`,
      },
    ]);

    try {
      const objectiveDto = { title: objectiveTitle };
      const createdObjective =
        await this.objectiveService.createObjective(objectiveDto);

      const objectiveID = createdObjective.id;
      console.log(objectiveID);

      await Promise.all(
        response.keyResults.map((keyResult) => {
          const createKeyResult: CreateKeyresultDto = {
            ...keyResult,
            objectiveID,
          };
          return this.keyResultService.create(createKeyResult);
        }),
      );
    } catch (error) {
      console.error('Error creating objective and key results:', error);
    }
  }
}
