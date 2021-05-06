import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BookingService } from '@/modules/bookings/booking.service';
import Booking from '@/modules/bookings/entities/booking.entity';
import { BookingController } from '@/modules/bookings/booking.controller';

import { AvailabilityService } from '@/modules/availabilities/availability.service';
import Availability from '@/modules/availabilities/entities/availability.entity';

import { UserService } from '@/modules/users/user.service';
import User from '@/modules/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Availability, Booking, User])],
  controllers: [BookingController],
  providers: [AvailabilityService, BookingService, UserService],
})
export class BookingModule {}
