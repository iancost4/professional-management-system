import Availability from '@/modules/availabilities/entities/availability.entity';
import { AvailabilityService } from '@/modules/availabilities/availability.service';
import { UserService } from '@/modules/users/user.service';

describe('Test Availability Controller', () => {
  let availabilityService: AvailabilityService;
  let userService: UserService;

  beforeEach(() => {
    availabilityService = new AvailabilityService(userService, Availability);
    jest.clearAllMocks();
  });

  it('Check if available time is valid. Expected Ok Response.', async () => {
    const response = await availabilityService.validAvailableTime(
      '09:00',
      '10:00',
    );

    expect(response).toBe(true);
  });

  it('Check if format available times is valid. Expected Ok Response.', async () => {
    const response = await availabilityService.formatAvailableTimes(
      '09:00',
      '10:00',
    );

    expect(response).toStrictEqual(['09:00']);
  });
});
