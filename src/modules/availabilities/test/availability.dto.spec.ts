import * as faker from 'faker';

import { mockAvailability } from '@/mocks/availability.mock';
import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import AvailabilityDto from '@/modules/availabilities/dto/availability.dto';
import commonValidations from '@/utils/common-validations';

describe('Test Availability DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(
      AvailabilityDto,
      {},
    );
    expect(3).toEqual(validation.length);

    commonValidations(validation, 'day');
    commonValidations(validation, 'availableTime');
    commonValidations(validation, 'professionalId');
  });

  it('Validate if is the correct type', async () => {
    const successCase: Array<any> = await validateSpecificDto(
      AvailabilityDto,
      mockAvailability,
    );

    expect(0).toEqual(successCase.length);

    const failedCase: Array<any> = await validateSpecificDto(AvailabilityDto, {
      id: faker.random.word(),
      day: faker.datatype.number(),
      schedule: faker.datatype.number(),
      professionalId: faker.random.word(),
    });

    expect(4).toEqual(failedCase.length);
  });
});
