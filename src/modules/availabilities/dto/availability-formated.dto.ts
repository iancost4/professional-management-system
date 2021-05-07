import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class AvailabilityFormatedDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'MONDAY' })
  @IsString()
  readonly day: string;

  @IsNotEmpty()
  @ApiProperty({ example: { availableTime: ['08:00', '08:30', '09:00'] } })
  @IsString()
  readonly availableTimes: Array<any>;
}
