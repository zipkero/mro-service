import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface StandardErrorResponse {
  success: boolean;
  error: {
    code: number;
    message: string;
    path: string;
  };
}

function isStandardErrorResponse(obj: any): obj is StandardErrorResponse {
  return !!(obj as StandardErrorResponse);
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let finalErrorResponse: StandardErrorResponse;
    const exceptionContent =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    if (isStandardErrorResponse(exceptionContent)) {
      finalErrorResponse = {
        success: false,
        error: {
          code: status,
          message: exceptionContent.error.message,
          path: request.url,
        },
      };

      response.status(status).json(finalErrorResponse);
    } else {
      const errorResponse = {
        success: false,
        error: {
          code: status,
          message: exceptionContent,
          path: request.url,
        },
      };

      response.status(status).json(errorResponse);
    }
  }
}
