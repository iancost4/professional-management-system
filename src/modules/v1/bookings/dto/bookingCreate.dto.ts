import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingCreateDto {
  @ApiProperty({ example: '08:30' })
  @IsNotEmpty({ message: 'appointmentTime:Campo obrigatório.' })
  @IsString()
  appointmentTime: string;

  @ApiProperty({ example: '05/05/2021' })
  @IsNotEmpty({ message: 'date:Campo obrigatório.' })
  @IsString()
  date: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty({ message: 'clientId:Campo obrigatório.' })
  @IsNumber()
  clientId: number;

  @ApiProperty({ example: 3 })
  @IsNotEmpty({ message: 'professionalId:Campo obrigatório.' })
  @IsNumber()
  professionalId: number;
}
