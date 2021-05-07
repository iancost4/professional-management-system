import { HttpResponse } from '@/utils/http-response';
import Booking from '@/modules/bookings/entities/booking.entity';
import { BookingController } from '@/modules/bookings/booking.controller';
import { BookingService } from '@/modules/bookings/booking.service';
import Availability from '@/modules/availabilities/entities/availability.entity';
import { AvailabilityService } from '@/modules/availabilities/availability.service';
import User from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/user.service';
import {
  mockBooking,
  mockBookingCreate,
  mockBookingPromise,
} from '@/mocks/booking.mock';

describe('Test User Controller', () => {
  let bookingController: BookingController;
  let bookingService: BookingService;
  let availabilityService: AvailabilityService;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(User);
    availabilityService = new AvailabilityService(userService, Availability);
    bookingService = new BookingService(
      userService,
      availabilityService,
      Booking,
    );
    bookingController = new BookingController(bookingService);
    jest.clearAllMocks();

    jest
      .spyOn(bookingService, 'store')
      .mockReturnValue(
        Promise.resolve((mockBookingPromise as unknown) as Promise<Booking>),
      );
  });

  it('Create a new booking. Expected Ok Response.', async () => {
    const response = await bookingController.store(mockBookingCreate);

    expect(response).toStrictEqual(
      HttpResponse.successfullyCreated(mockBooking).transformToReponse(),
    );
  });
});
