import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import { AvailabilityCreateDto } from '@/modules/availabilities/dto/availability-create.dto';
import commonValidations from '@/utils/common-validations';

describe('Test Availability Create DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(
      AvailabilityCreateDto,
      {},
    );

    expect(4).toEqual(validation.length);

    commonValidations(validation, 'day');
    commonValidations(validation, 'availableTimeStart');
    commonValidations(validation, 'availableTimeEnd');
    commonValidations(validation, 'professionalId');
  });
});
