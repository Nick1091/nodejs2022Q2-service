import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: MyLogger;

  constructor() {
    this.logger = new MyLogger();
    this.logger.setContext(LoggerMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, params, originalUrl, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        ` Code:${statusCode} Method:${method} URL:${originalUrl} Body:${JSON.stringify(
          body,
        )} Params:${JSON.stringify(params)}
        `,
        LoggerMiddleware.name,
      );
    });

    next();
  }
}
