import { OrderFilterInterface } from './orderFilter.interface';

export interface FilterInterface {
  page?: number;
  perPage?: number;
  order?: OrderFilterInterface;
  where?: any;
}