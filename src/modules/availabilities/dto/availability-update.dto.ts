import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityUpdateDto {
  @IsNotEmpty({ message: 'day:Campo obrigatório.' })
  @ApiProperty({ example: 'MONDAY' })
  day: string;

  @IsNotEmpty({ message: 'availableTime:Campo obrigatório.' })
  @ApiProperty({ example: '08:30' })
  availableTime: string;
}
