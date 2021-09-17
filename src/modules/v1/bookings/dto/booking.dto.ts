import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsString,
  IsOptional,
} from 'class-validator';
import UserDto from '@/modules/v1/users/dto/user.dto';
import { BookingInterface } from '@/modules/v1/bookings/interfaces/booking.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export default class BookingDto implements BookingInterface {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ example: '10/10/2010' })
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty({ example: '08:30' })
  @IsNotEmpty()
  @IsString()
  readonly appointmentTime: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly clientId: number;

  @IsNotEmpty()
  @Type(() => UserDto)
  readonly client?: UserDto;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly professionalId: number;

  @IsNotEmpty()
  @Type(() => UserDto)
  readonly professional?: UserDto;
}
