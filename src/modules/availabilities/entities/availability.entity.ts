import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from '@/modules/users/entities/user.entity';
import { AvailabilityInterface } from '@/modules/availabilities/interfaces/availability.interface';

@Table({ tableName: 'availabilities' })
export default class Availability
  extends Model<Availability>
  implements AvailabilityInterface {
  @Column({
    allowNull: false,
  })
  day: string;

  @Column({
    allowNull: false,
  })
  availableTime: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
  })
  professionalId: number;

  @BelongsTo(() => User, 'professionalId')
  professional: User;
}
