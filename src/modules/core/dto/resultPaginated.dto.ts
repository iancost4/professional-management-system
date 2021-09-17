import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDto {
  @ApiProperty({ example: 54 })
  totalCount: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  perPage: number;

  @ApiProperty({ example: {} })
  data: any;
}