import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from '@/modules/v1/users/entities/user.entity';
import { BookingInterface } from '@/modules/v1/bookings/interfaces/booking.interface';

@Table({ tableName: 'bookings' })
export default class Booking
  extends Model<Booking>
  implements BookingInterface
{
  @Column({ allowNull: true, type: DataType.DATE })
  date: Date;

  @Column({
    allowNull: false,
  })
  appointmentTime: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
  })
  clientId: number;

  @BelongsTo(() => User, 'clientId')
  client: User;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
  })
  professionalId: number;

  @BelongsTo(() => User, 'professionalId')
  professional: User;
}
