import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { UserInterface } from '@/modules/v1/users/interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export default class UserDto implements UserInterface {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ example: 'Ian' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
