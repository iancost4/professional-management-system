import { IsNumber, IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Days } from '@/utils/days.enum';

export class AvailabilityCreateDto {
  @ApiProperty({ example: 'MONDAY' })
  @IsNotEmpty({ message: 'day:Campo obrigatório.' })
  @IsEnum(Days, {
    message:
      'o campo day deve ser um dos: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY or SUNDAY',
  })
  day: Days;

  @ApiProperty({ example: 3 })
  @IsNotEmpty({ message: 'professionalId:Campo obrigatório.' })
  @IsNumber()
  professionalId: number;

  @ApiProperty({ example: '08:30' })
  @IsNotEmpty({ message: 'availableTimeStart:Campo obrigatório.' })
  @IsString()
  availableTimeStart: string;

  @IsNotEmpty({ message: 'availableTimeEnd:Campo obrigatório.' })
  @ApiProperty({ example: '09:30' })
  @IsString()
  availableTimeEnd: string;
}
