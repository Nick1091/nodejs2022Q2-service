import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from 'src/logger/logger.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export type ErrorResponse = {
  statusCode: HttpStatus;
  error: string;
  method?: string;
  timeStamp?: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: MyLogger) {
    this.logger.setContext(AllExceptionsFilter.name);
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      this.setErrorResponse(exception, req, res);
    } else if (exception instanceof PrismaClientKnownRequestError) {
      this.setPrismaErrorsHandler(exception, req, res);
    } else {
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR as number;
      const response = {
        statusCode: statusCode,
        error: 'Critical internal server error occurred!',
        timeStamp: new Date().toISOString(),
      };
      const errorLog = this.getErrorLog(response, req);
      this.logger.error(errorLog, AllExceptionsFilter.name);
      res.status(statusCode).json(response);
    }
  }

  private setErrorResponse(
    exception: HttpException,
    req: Request,
    res: Response,
  ) {
    const statusCode = exception.getStatus();
    const message = exception.getResponse();
    // const mes = typeof message === 'string' ? message : message['message'];
    const response = {
      statusCode: statusCode,
      error: message['message'],
      timeStamp: new Date().toISOString(),
    };

    const errorLog = this.getErrorLog(response, req);
    this.logger.error(errorLog, AllExceptionsFilter.name);
    res.status(statusCode).json(response);
  }

  private setPrismaErrorsHandler(
    exception: PrismaClientKnownRequestError,
    req: Request,
    res: Response,
  ) {
    let statusCode: HttpStatus;
    let response: ErrorResponse;
    if (exception.code === 'P2002') {
      statusCode = HttpStatus.FORBIDDEN;
      response = {
        statusCode: statusCode,
        error: 'Credentials incorrect',
        timeStamp: new Date().toISOString(),
      };
    } else if (exception.code === 'P2025') {
      statusCode = HttpStatus.NOT_FOUND;
      response = {
        statusCode: statusCode,
        error: 'Init params not found',
        timeStamp: new Date().toISOString(),
      };
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Prisma Error',
        timeStamp: new Date().toISOString(),
      };
    }
    const errorLog = this.getErrorLog(response, req);
    this.logger.error(errorLog, AllExceptionsFilter.name);
    res.status(statusCode).json(response);
  }

  private getErrorLog(errorResponse: ErrorResponse, req: Request) {
    const { statusCode, error } = errorResponse;
    const { method, url } = req;

    return `Code:${statusCode} Message:${JSON.stringify(
      error,
    )} Method:${method} URL:${url} Body:${JSON.stringify(req.body)}
    `;
  }
}
