import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { AvailabilityModule } from '@/modules/availabilities/availability.module';
import { BookingModule } from '@/modules/bookings/booking.module';
import { UserModule } from '@/modules/users/user.module';

const modules = [AvailabilityModule, BookingModule, UserModule];
@Module({
  imports: [MysqlDatabaseProviderModule, ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
