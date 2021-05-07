import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { UserInterface } from '@/modules/users/interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export default class UserDto implements UserInterface {
  @ValidateIf((template) => template.id)
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Ian' })
  @IsString()
  readonly name: string;
}
