import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators';
import { MyLogger } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(AppController.name);
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
