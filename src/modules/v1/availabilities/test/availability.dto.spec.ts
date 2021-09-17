import * as faker from 'faker';

import AvailabilityDto from '@/modules/v1/availabilities/dto/availability.dto';
import { mockAvailability } from '@/mocks/availability.mock';
import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import commonValidations from '@/utils/common-validations';

describe('Test Availability DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const REQUIRED_FIELDS_AMOUNT = 3;
  const INCORRECT_FIELDS_AMOUNT = 4;
  const SUCCESS = 0;

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(
      AvailabilityDto,
      {},
    );
    expect(REQUIRED_FIELDS_AMOUNT).toEqual(validation.length);

    commonValidations(validation, 'day');
    commonValidations(validation, 'availableTime');
    commonValidations(validation, 'professionalId');
  });

  it('Validate if is the correct type', async () => {
    const successCase: Array<any> = await validateSpecificDto(
      AvailabilityDto,
      mockAvailability,
    );

    expect(SUCCESS).toEqual(successCase.length);

    const failedCase: Array<any> = await validateSpecificDto(AvailabilityDto, {
      id: faker.random.word(),
      day: faker.datatype.number(),
      schedule: faker.datatype.number(),
      professionalId: faker.random.word(),
    });

    expect(INCORRECT_FIELDS_AMOUNT).toEqual(failedCase.length);
  });
});
