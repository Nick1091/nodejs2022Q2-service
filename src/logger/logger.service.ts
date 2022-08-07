import { Injectable, Scope } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';
import { existsSync, mkdirSync, appendFileSync } from 'fs';
import * as fs from 'fs';
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
  private file: string;

  constructor() {
    super();
    this.setLogLevels(LOG_ARGS.slice(0, LOG_LEVEL));
    this.isLogCheck = Boolean(IS_LOG_CHECK);
    this.fileSize = +FILE_SIZE * 1024;
  }

  log(message: string, context?: string) {
    super.log.call(this, message, context);
    this.writeToFile(message, 'log');
  }
  error(message: string, context?: string) {
    super.error.call(this, message, context);
    this.writeToFile(message, 'error');
  }
  warn(message: any, context?: string) {
    super.warn.call(this, message, context);
    this.writeToFile(message, 'warn');
  }
  debug(message: any, context: string) {
    super.debug.call(this, message, context);
    this.writeToFile(message, 'debug');
  }
  verbose(message: any, context: string) {
    super.verbose.call(this, message, context);
    this.writeToFile(message, 'verbose');
  }

  writeToFile(message: string, fileName: string) {
    if (existsSync(LOGS_DIR)) {
      appendFileSync(
        `${LOGS_DIR}/${fileName}.log`,
        `timestamp: ${new Date().toLocaleString()}, ${message} \n`,
      );
    } else {
      mkdirSync(LOGS_DIR);
      // if ( getFilesize(this.file) > 1000) {
      this.file = `${LOGS_DIR}/${fileName}${new Date().toLocaleString()}.log`;
      appendFileSync(
        this.file,
        `timestamp: ${new Date().toLocaleString()}, ${message} \n`,
      );
    }
  }
  // getFilesize(filename) {
  //   const stats = fs.statSync(filename);
  //   const fileSizeInBytes = stats.size;
  //   return fileSizeInBytes;
  // }
}
