import { Table, Model, Column } from 'sequelize-typescript';
import { UserInterface } from '@/modules/v1/users/interfaces/user.interface';

@Table({
  tableName: 'users',
})
export default class User extends Model<User> implements UserInterface {
  @Column({
    allowNull: false,
  })
  name: string;
}
