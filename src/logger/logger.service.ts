import { Injectable, Scope } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';
import { FILE_SIZE, IS_LOG_CHECK, LOG_LEVEL } from 'src/common/config';
import { LOG_ARGS } from 'src/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  private logLevelArray: string[];
  private fileSize: number;
  private isLogCheck: boolean;

  constructor() {
    super();
    this.logLevelArray = LOG_ARGS.slice(0, LOG_LEVEL);
    this.isLogCheck = Boolean(IS_LOG_CHECK);
    this.fileSize = +FILE_SIZE * 1024;
  }

  log(message: string, context?: string) {
    if (this.logLevelArray.includes('log')) {
      super.log.call(this, message, context);
    }
  }
  error(message: string, context?: string) {
    if (this.logLevelArray.includes('error')) {
      super.log.call(this, message, context);
    }
  }
  warn(message: any, context?: string) {
    if (this.logLevelArray.includes('warn')) {
      super.log.call(this, message, context);
    }
  }
  debug(message: any, context: string) {
    if (this.logLevelArray.includes('warn')) {
      super.log.call(this, message, context);
    }
  }
  verbose(message: any, context: string) {
    if (this.logLevelArray.includes('warn')) {
      super.log.call(this, message, context);
    }
  }
}
