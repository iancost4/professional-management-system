import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingCreateDto {
  @IsNotEmpty({ message: 'appointmentTime:Campo obrigatório.' })
  @ApiProperty({ example: '08:30' })
  appointmentTime: string;

  @IsNotEmpty({ message: 'date:Campo obrigatório.' })
  @ApiProperty({ example: '05/05/2021' })
  date: string;

  @IsNotEmpty({ message: 'clientId:Campo obrigatório.' })
  @ApiProperty({ example: 3 })
  clientId: number;

  @IsNotEmpty({ message: 'professionalId:Campo obrigatório.' })
  @ApiProperty({ example: 3 })
  professionalId: number;
}
