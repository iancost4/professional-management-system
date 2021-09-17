import { IsNumber, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterInterface } from '@/modules/core/interfaces/filter.interface';
import { OrderFilterDto } from './orderFilter.dto';
import { plainToClass, Transform } from 'class-transformer';

export class FilterDto implements FilterInterface {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    default: 10,
  })
  readonly perPage?: number;

  @ApiPropertyOptional({
    description: 'Order options',
    example: `{"sortField":"id","sortOrder":"ASC"}`,
    type: 'deepObject',
    format: 'deepObject',
    maxProperties: 2,
  })
  @IsOptional()
  @Transform(({ value }) => plainToClass(OrderFilterDto, JSON.parse(value)))
  readonly order?: OrderFilterDto;

  @ApiPropertyOptional({
    description: `Query for search, use <a href='https://sequelize.org/v5/manual/querying.html#operators-aliases'>string operators</a>`,
    type: 'deepObject',
    format: 'deepObject',
    items: {
      type: 'string',
    },
    example: `{"name":{"$like":"%some name%"}}`,
  })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  readonly where?: any;
}