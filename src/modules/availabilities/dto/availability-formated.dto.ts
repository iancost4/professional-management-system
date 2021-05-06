import { IsNotEmpty, IsString } from 'class-validator';

export default class AvailabilityFormatedDto {
  @IsNotEmpty()
  @IsString()
  readonly day: string;

  @IsNotEmpty()
  @IsString()
  readonly availableTimes: Array<any>;
}
