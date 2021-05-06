import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import UserDto from '@/modules/users/dto/user.dto';
import { AvailabilityInterface } from '@/modules/availabilities/interfaces/availability.interface';

export default class AvailabilityDto implements AvailabilityInterface {
  @ValidateIf((user) => user.id)
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly day: string;

  @IsNotEmpty()
  @IsString()
  readonly availableTime: string;

  @IsNotEmpty()
  @IsNumber()
  readonly professionalId: number;

  readonly professional?: UserDto;
}
