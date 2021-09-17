import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import UserDto from '@/modules/v1/users/dto/user.dto';
import { AvailabilityInterface } from '@/modules/v1/availabilities/interfaces/availability.interface';
import { ApiProperty } from '@nestjs/swagger';

export default class AvailabilityDto implements AvailabilityInterface {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ example: 'MONDAY' })
  @IsNotEmpty()
  @IsString()
  readonly day: string;

  @ApiProperty({ example: '08:00' })
  @IsNotEmpty()
  @IsString()
  readonly availableTime: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  readonly professionalId: number;

  readonly professional?: UserDto;
}
