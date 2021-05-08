import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Days } from '@/utils/days.enum';

export class AvailabilityCreateDto {
  @IsNotEmpty({ message: 'day:Campo obrigatório.' })
  @ApiProperty({ example: 'MONDAY' })
  day: Days;

  @IsNumber()
  @IsNotEmpty({ message: 'professionalId:Campo obrigatório.' })
  @ApiProperty({ example: 3 })
  professionalId: number;

  @IsNotEmpty({ message: 'availableTimeStart:Campo obrigatório.' })
  @ApiProperty({ example: '08:30' })
  availableTimeStart: string;

  @IsNotEmpty({ message: 'availableTimeEnd:Campo obrigatório.' })
  @ApiProperty({ example: '09:30' })
  availableTimeEnd: string;
}
