import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsString,
  ValidateIf,
} from 'class-validator';
import UserDto from '@/modules/users/dto/user.dto';
import { BookingInterface } from '@/modules/bookings/interfaces/booking.interface';

export default class BookingDto implements BookingInterface {
  @ValidateIf((user) => user.id)
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsString()
  readonly appointmentTime: string;

  @IsNotEmpty()
  @IsNumber()
  readonly clientId: number;

  readonly client?: UserDto;

  @IsNotEmpty()
  @IsNumber()
  readonly professionalId: number;

  readonly professional?: UserDto;
}
