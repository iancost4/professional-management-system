import { HttpResponse } from '@/utils/http-response';
import Booking from '@/modules/bookings/entities/booking.entity';
import { BookingService } from '@/modules/bookings/booking.service';
import Availability from '@/modules/availabilities/entities/availability.entity';
import { AvailabilityService } from '@/modules/availabilities/availability.service';
import User from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/user.service';
import { mockBooking, mockBookingCreate } from '@/mocks/booking.mock';

import { mockAvailabilityFormatedPromise } from '@/mocks/availability.mock';
import AvailabilityFormatedDto from '@/modules/availabilities/dto/availability-formated.dto';

describe('Test User Controller', () => {
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
    jest.clearAllMocks();

    jest
      .spyOn(availabilityService, 'showAllByProfessionalId')
      .mockReturnValue(
        Promise.resolve(
          (mockAvailabilityFormatedPromise as unknown) as Promise<
            AvailabilityFormatedDto[]
          >,
        ),
      );
  });

  it('Check if exists available time. Expected Ok Response.', async () => {
    const response = await bookingService.checkExistsAvailableTime(
      '09:00',
      1,
      '25/12/2021',
    );

    expect(response).toBe(true);
  });

  it('Check if time is valid. Expected Ok Response.', async () => {
    const response = await bookingService.validAvailableTime('09:00');

    expect(response).toBe(true);
  });
});
