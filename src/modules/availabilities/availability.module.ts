import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AvailabilityController } from '@/modules/availabilities/availability.controller';
import { AvailabilityService } from '@/modules/availabilities/availability.service';
import Availability from '@/modules/availabilities/entities/availability.entity';

import { UserService } from '@/modules/users/user.service';
import User from '@/modules/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Availability, User])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, UserService],
})
export class AvailabilityModule {}
