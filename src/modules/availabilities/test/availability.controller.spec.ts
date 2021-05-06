import { HttpResponse } from '@/utils/http-response';

import Availability from '@/modules/availabilities/entities/availability.entity';
import { AvailabilityController } from '@/modules/availabilities/availability.controller';
import { AvailabilityService } from '@/modules/availabilities/availability.service';
import User from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/user.service';
import {
  mockAvailability,
  mockAvailabilityCreate,
  mockAvailabilityUpdate,
  mockAvailabilityPromise,
  mockAvailabilityFormated,
} from '@/mocks/availability.mock';

import * as faker from 'faker';
import AvailabilityFormatedDto from '../dto/availability-formated.dto';

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
          (mockAvailabilityPromise as unknown) as Promise<Availability>,
        ),
      );

    jest
      .spyOn(availabilityService, 'showAllByProfessionalId')
      .mockReturnValue(
        (mockAvailabilityFormated as unknown) as Promise<
          AvailabilityFormatedDto[]
        >,
      );

    jest
      .spyOn(availabilityService, 'store')
      .mockReturnValue((true as unknown) as Promise<boolean>);

    jest
      .spyOn(availabilityService, 'update')
      .mockReturnValue(
        Promise.resolve(
          (mockAvailabilityPromise as unknown) as Promise<Availability>,
        ),
      );

    jest
      .spyOn(availabilityService, 'destroy')
      .mockReturnValue((true as unknown) as Promise<boolean>);
  });

  it('Find Availability.', async () => {
    const findAvailability = await availabilityController.show(1);

    expect(mockAvailability).toBe(findAvailability);
  });

  it('Find Professional Availabilities', async () => {
    const findProfAvailabilities = await availabilityController.showByProfessionalId(1);

    expect(mockAvailabilityFormated).toBe(findProfAvailabilities);
  });

  it('Store Professional Availabilities', async () => {
    const findProfAvailabilities = await availabilityController.store(
      mockAvailabilityCreate,
    );

    expect(findProfAvailabilities).toStrictEqual(
      HttpResponse.successfullyCreated().transformToReponse(),
    );
  });

  it('Update Availability', async () => {
    const availabilityId = faker.datatype.number();
    const findProfAvailabilities = await availabilityController.update(
      availabilityId,
      mockAvailabilityUpdate,
    );

    expect(mockAvailability).toBe(findProfAvailabilities);
  });

  it('Delete Availability', async () => {
    const availabilityId = faker.datatype.number();
    const findProfAvailabilities = await availabilityController.destroy(
      availabilityId,
    );

    expect(findProfAvailabilities).toStrictEqual(
      HttpResponse.successfullyDeleted().transformToReponse(),
    );
  });
});
