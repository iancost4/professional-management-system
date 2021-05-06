import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsNotEmpty({ message: 'name:Campo obrigatório.' })
  @ApiProperty({ example: 'Ian' })
  name: string;
}
