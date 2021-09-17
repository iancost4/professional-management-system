import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class AvailabilityFormatedDto {
  @ApiProperty({ example: 'MONDAY' })
  @IsNotEmpty()
  @IsString()
  readonly day: string;

  @ApiProperty({ example: { availableTime: ['08:00', '08:30', '09:00'] } })
  @IsNotEmpty()
  @IsString()
  readonly availableTimes: Array<any>;
}
