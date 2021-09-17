import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import { AvailabilityCreateDto } from '@/modules/v1/availabilities/dto/availabilityCreate.dto';
import commonValidations from '@/utils/common-validations';

describe('Test Availability Create DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const REQUIRED_FIELDS_AMOUNT = 4;

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(
      AvailabilityCreateDto,
      {},
    );

    expect(REQUIRED_FIELDS_AMOUNT).toEqual(validation.length);

    commonValidations(validation, 'day');
    commonValidations(validation, 'availableTimeStart');
    commonValidations(validation, 'availableTimeEnd');
    commonValidations(validation, 'professionalId');
  });
});
