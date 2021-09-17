import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { HttpResponse } from '@/utils/http-response';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : exception;
    const result =
      CustomExceptionFilter.handleResponseMessage(exceptionResponse);

    return response
      .status(+result.status)
      .send(result.responseData.transformToReponse());
  }

  private static handleResponseMessage(exception: any) {
    let status = '500';
    let responseData = HttpResponse.internalServerError();

    if (exception instanceof HttpResponse) {
      responseData = exception;
      status = exception.httpCode.toString();
    } else {
      console.log(exception);
    }

    return {
      status: status,
      responseData: responseData,
    };
  }
}
