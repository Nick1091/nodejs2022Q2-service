import { Injectable, Scope } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { FILE_SIZE, IS_LOG_CHECK, LOG_LEVEL } from 'src/common/config';
import { LOG_ARGS } from 'src/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  private fileSize: number;
  private isLogCheck: boolean;
  private fileName: string;

  constructor() {
    super();
    this.setLogLevels(LOG_ARGS.slice(0, LOG_LEVEL));
    this.isLogCheck = Boolean(IS_LOG_CHECK);
    this.fileSize = +FILE_SIZE * 1000;
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

  private writeToFile = (message: string, type: string): void => {
    if (!this.isLogCheck) {
      return;
    }
    const dataFile = `${type}${message}`;
    if (!this.fileName) {
      this.createFileAndSave(dataFile, type);
    } else {
      this.apFile(dataFile, type);
    }
  };

  createFileAndSave(message: string, type: string) {
    this.fileName = `${type}_${Date.now()}.log`;
    fs.readdir('LOGS', (err) => {
      if (err) {
        fs.mkdir('LOGS', (error) => {
          if (error) throw Error(error.message);
        });
        fs.appendFile(`LOGS/${this.fileName}`, `${message}`, 'utf8', (err) => {
          if (err) throw err;
        });
      } else {
        fs.appendFile(`LOGS/${this.fileName}`, `${message}`, 'utf8', (err) => {
          if (err) throw err;
        });
      }
    });
  }

  apFile(message: string, type: string) {
    fs.stat(`LOGS/${this.fileName}`, (err, stat) => {
      if (err) {
        fs.readdir('LOGS', (err) => {
          if (err) {
            fs.mkdir('LOGS', (error) => {
              if (error) throw Error(error.message);
            });
            fs.appendFile(
              `LOGS/${this.fileName}`,
              `${message}`,
              'utf8',
              (err) => {
                if (err) throw err;
              },
            );
          } else {
            fs.appendFile(
              `LOGS/${this.fileName}`,
              `${message}`,
              'utf8',
              (err) => {
                if (err) throw err;
              },
            );
          }
        });
      } else {
        if (stat.size > this.fileSize) {
          this.fileName = `${type}_${Date.now()}.log`;
        }
        fs.readdir('LOGS', (err) => {
          if (err) {
            fs.mkdir('LOGS', (error) => {
              if (error) throw Error(error.message);
            });
            fs.appendFile(
              `LOGS/${this.fileName}`,
              `${message}`,
              'utf8',
              (err) => {
                if (err) throw err;
              },
            );
          } else {
            fs.appendFile(
              `LOGS/${this.fileName}`,
              `${message}`,
              'utf8',
              (err) => {
                if (err) throw err;
              },
            );
          }
        });
      }
    });
  }
}
