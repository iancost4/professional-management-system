import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AvailabilityController } from '@/modules/v1/availabilities/availability.controller';
import { AvailabilityService } from '@/modules/v1/availabilities/availability.service';
import Availability from '@/modules/v1/availabilities/entities/availability.entity';

import { UserService } from '@/modules/v1/users/user.service';
import User from '@/modules/v1/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Availability, User])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, UserService],
})
export class AvailabilityModule {}
