import { Injectable } from '@nestjs/common';
import { MyLogger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private logger: MyLogger) {}
  getHello(): string {
    this.logger.error('error', AppService.name);
    this.logger.log('log', AppService.name);
    this.logger.warn('some warning', AppService.name);
    this.logger.debug('debug', AppService.name);
    this.logger.verbose('verbose', AppService.name);
    return 'Hello World!';
  }
}
