import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import UserDto from '@/modules/users/dto/user.dto';
import { AvailabilityInterface } from '@/modules/availabilities/interfaces/availability.interface';
import { ApiProperty } from '@nestjs/swagger';

export default class AvailabilityDto implements AvailabilityInterface {
  @ValidateIf((user) => user.id)
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'MONDAY' })
  @IsString()
  readonly day: string;

  @IsNotEmpty()
  @ApiProperty({ example: '08:00' })
  @IsString()
  readonly availableTime: string;

  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  @IsNumber()
  readonly professionalId: number;

  readonly professional?: UserDto;
}
