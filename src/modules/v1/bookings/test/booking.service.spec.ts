import Booking from '@/modules/v1/bookings/entities/booking.entity';
import { BookingService } from '@/modules/v1/bookings/booking.service';
import Availability from '@/modules/v1/availabilities/entities/availability.entity';
import { AvailabilityService } from '@/modules/v1/availabilities/availability.service';
import User from '@/modules/v1/users/entities/user.entity';
import { UserService } from '@/modules/v1/users/user.service';

import { mockAvailabilityFormatedPromise } from '@/mocks/availability.mock';
import AvailabilityFormatedDto from '@/modules/v1/availabilities/dto/availabilityFormated.dto';

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
          mockAvailabilityFormatedPromise as unknown as Promise<
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
