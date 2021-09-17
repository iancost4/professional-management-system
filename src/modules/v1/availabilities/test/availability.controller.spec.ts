import { HttpResponse } from '@/utils/http-response';
import * as faker from 'faker';

import Availability from '@/modules/v1/availabilities/entities/availability.entity';
import { AvailabilityController } from '@/modules/v1/availabilities/availability.controller';
import { AvailabilityService } from '@/modules/v1/availabilities/availability.service';
import AvailabilityFormatedDto from '@/modules/v1/availabilities/dto/availabilityFormated.dto';

import User from '@/modules/v1/users/entities/user.entity';
import { UserService } from '@/modules/v1/users/user.service';

import {
  mockAvailability,
  mockAvailabilityCreate,
  mockAvailabilityUpdate,
  mockAvailabilityPromise,
  mockAvailabilityFormated,
} from '@/mocks/availability.mock';

describe('Test Availability Controller', () => {
  let availabilityController: AvailabilityController;
  let availabilityService: AvailabilityService;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(User);
    availabilityService = new AvailabilityService(userService, Availability);
    availabilityController = new AvailabilityController(availabilityService);
    jest.clearAllMocks();

    jest
      .spyOn(availabilityService, 'show')
      .mockReturnValue(
        Promise.resolve(
          mockAvailabilityPromise as unknown as Promise<Availability>,
        ),
      );

    jest
      .spyOn(availabilityService, 'showAllByProfessionalId')
      .mockReturnValue(
        mockAvailabilityFormated as unknown as Promise<
          AvailabilityFormatedDto[]
        >,
      );

    jest
      .spyOn(availabilityService, 'store')
      .mockReturnValue(true as unknown as Promise<boolean>);

    jest
      .spyOn(availabilityService, 'update')
      .mockReturnValue(
        Promise.resolve(
          mockAvailabilityPromise as unknown as Promise<Availability>,
        ),
      );

    jest
      .spyOn(availabilityService, 'destroy')
      .mockReturnValue(true as unknown as Promise<boolean>);
  });

  it('Find Availability.', async () => {
    const availabilityId = faker.datatype.number();
    const availability = await availabilityController.show(availabilityId);

    expect(availability).toStrictEqual(
      HttpResponse.foundSuccessfully(mockAvailability).transformToReponse(),
    );
  });

  it('Find Professional Availabilities', async () => {
    const availabilityId = faker.datatype.number();
    const availabilities = await availabilityController.showByProfessionalId(
      availabilityId,
    );

    expect(mockAvailabilityFormated).toBe(availabilities);
  });

  it('Store Professional Availabilities', async () => {
    const availability = await availabilityController.store(
      mockAvailabilityCreate,
    );

    expect(availability).toStrictEqual(
      HttpResponse.successfullyCreated().transformToReponse(),
    );
  });

  it('Update Availability', async () => {
    const availabilityId = faker.datatype.number();
    const availability = await availabilityController.update(
      availabilityId,
      mockAvailabilityUpdate,
    );

    expect(availability).toStrictEqual(
      HttpResponse.updatedSuccessfully(mockAvailability).transformToReponse(),
    );
  });

  it('Delete Availability', async () => {
    const availabilityId = faker.datatype.number();
    const availability = await availabilityController.destroy(availabilityId);

    expect(availability).toStrictEqual(
      HttpResponse.successfullyDeleted().transformToReponse(),
    );
  });
});
