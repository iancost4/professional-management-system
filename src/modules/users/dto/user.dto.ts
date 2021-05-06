import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { UserInterface } from '@/modules/users/interfaces/user.interface';

export default class UserDto implements UserInterface {
  @ValidateIf((template) => template.id)
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
