import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'Ian' })
  @IsNotEmpty({ message: 'name:Campo obrigatório.' })
  @IsString()
  name: string;
}
