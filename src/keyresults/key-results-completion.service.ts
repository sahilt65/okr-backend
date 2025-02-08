import { Injectable } from '@nestjs/common';
import { CreateKeyresultDto } from './create-keyresult.dto';

@Injectable()
export class KeyResultsCompletionService {
  isCompleted(keyResultDto: CreateKeyresultDto) {
    return keyResultDto.currentValue >= keyResultDto.targetValue;
  }
}
