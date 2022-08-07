import { Injectable, Scope } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';
import fs, { access } from 'fs/promises';
import {
  FILE_SIZE,
  IS_LOG_CHECK,
  LOGS_DIR,
  LOG_LEVEL,
} from 'src/common/config';
import { LOG_ARGS } from 'src/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  private fileSize: number;
  private isLogCheck: boolean;

  constructor() {
    super();
    this.setLogLevels(LOG_ARGS.slice(0, LOG_LEVEL));
    this.isLogCheck = Boolean(IS_LOG_CHECK);
    this.fileSize = +FILE_SIZE * 1024;
  }

  log(message: string, context?: string) {
    super.log.call(this, message, context);
  }
  error(message: string, context?: string) {
    super.error.call(this, message, context);
  }
  warn(message: any, context?: string) {
    super.warn.call(this, message, context);
  }
  debug(message: any, context: string) {
    super.debug.call(this, message, context);
  }
  verbose(message: any, context: string) {
    super.verbose.call(this, message, context);
  }

  // writeToFile = (message: string) => {
  //   const dir = LOGS_DIR;
  //   fs
  // };
}
