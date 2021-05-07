import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class HttpResponse {
  @ApiProperty({ example: 'Missing attributes!' })
  message: string;

  @ApiProperty({ example: 422 })
  httpCode: number;

  @IsObject()
  @ApiProperty({ example: { firstName: 'Is empty!', type: 'Is empty!' } })
  data: any;

  constructor(message: string, httpCode: number, data?: any) {
    this.message = message;
    this.httpCode = httpCode;
    this.data = data || {};
  }

  public transformToReponse = (): HttpResponseToFront => {
    return new HttpResponseToFront({
      message: this.message,
      data: this.data,
    });
  };

  static foundSuccessfully = (data?: any) => {
    return new HttpResponse('Registro encontrado com sucesso!', 200, data);
  };

  static successfullyCreated = (data?: any) => {
    return new HttpResponse('Registro(s) criado(s) com sucesso!', 201, data);
  };

  static updatedSuccessfully = (data?: any) => {
    return new HttpResponse('Registro atualizado com sucesso!', 200, data);
  };

  static successfullyDeleted = () => {
    return new HttpResponse('Registro deletado com sucesso!', 200);
  };

  static invalidData = (data?: any) => {
    return new HttpResponse('Dados inválidos!', 422, data);
  };

  static invalidShortTime = (data?: any) => {
    return new HttpResponse('Intervalo de horário muito curto!', 422, data);
  };

  static invalidDate = () => {
    return new HttpResponse('Horário indisponivel!', 422);
  };

  static notFound = () => {
    return new HttpResponse('Informação não encontrada', 404);
  };

  static internalServerError = () => {
    return new HttpResponse('Erro interno do servidor!', 500);
  };
}

export class HttpResponseToFront {
  @ApiProperty({ example: 'Sucesso' })
  message: string;
  @ApiProperty({ example: {} })
  data: any;

  constructor(httpResponseToFront: HttpResponseToFront) {
    this.message = httpResponseToFront.message;
    this.data = httpResponseToFront.data;
  }
}
