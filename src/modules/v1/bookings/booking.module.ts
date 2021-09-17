import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BookingService } from '@/modules/v1/bookings/booking.service';
import Booking from '@/modules/v1/bookings/entities/booking.entity';
import { BookingController } from '@/modules/v1/bookings/booking.controller';

import { AvailabilityService } from '@/modules/v1/availabilities/availability.service';
import Availability from '@/modules/v1/availabilities/entities/availability.entity';

import { UserService } from '@/modules/v1/users/user.service';
import User from '@/modules/v1/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Availability, Booking, User])],
  controllers: [BookingController],
  providers: [AvailabilityService, BookingService, UserService],
})
export class BookingModule {}
