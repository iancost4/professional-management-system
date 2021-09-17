import { ApiProperty } from '@nestjs/swagger';
import { OrderFilterInterface } from '@/modules/core/interfaces/orderFilter.interface';

export class OrderFilterDto implements OrderFilterInterface {
  @ApiProperty({
    type: String,
    default: 'id',
    required: false,
  })
  readonly sortField: string;

  @ApiProperty({
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    required: false,
  })
  readonly sortOrder: string;
}