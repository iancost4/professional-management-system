import * as faker from 'faker';

import BookingDto from '@/modules/v1/bookings/dto/booking.dto';
import { BookingCreateDto } from '@/modules/v1/bookings/dto/bookingCreate.dto';

export const mockBooking: BookingDto = {
  id: faker.datatype.number(),
  date: faker.date.future(),
  appointmentTime: faker.random.word(),
  clientId: faker.datatype.number(),
  professionalId: faker.datatype.number(),
};

export const mockBookingCreate: BookingCreateDto = {
  date: faker.random.word(),
  appointmentTime: faker.random.word(),
  clientId: faker.datatype.number(),
  professionalId: faker.datatype.number(),
};

export const mockBookingPromise: Promise<BookingDto> =
  Promise.resolve(mockBooking);
