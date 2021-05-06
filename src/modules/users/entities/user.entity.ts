import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserInterface } from '@/modules/users/interfaces/user.interface';

@Table({ tableName: 'users' })
export default class User extends Model<User> implements UserInterface {
  @Column({
    allowNull: false,
  })
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
