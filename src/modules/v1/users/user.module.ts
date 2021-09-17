import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from '@/modules/v1/users/user.service';
import User from '@/modules/v1/users/entities/user.entity';
import { UserController } from '@/modules/v1/users/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
