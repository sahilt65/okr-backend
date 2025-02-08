import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';

@Controller('hello-world')
export class HelloWorldController {
  constructor(private helloWorldService: HelloWorldService) {}

  @Get('/')
  show() {
    return this.helloWorldService.show();
  }
}
