import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityUpdateDto {
  @ApiProperty({ example: 'MONDAY' })
  @IsNotEmpty({ message: 'day:Campo obrigatório.' })
  @IsString()
  day: string;

  @ApiProperty({ example: '08:30' })
  @IsNotEmpty({ message: 'availableTime:Campo obrigatório.' })
  @IsString()
  availableTime: string;
}
