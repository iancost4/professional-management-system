import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import { BookingCreateDto } from '@/modules/v1/bookings/dto/bookingCreate.dto';
import commonValidations from '@/utils/common-validations';

describe('Test Booking Create DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const REQUIRED_FIELDS_AMOUNT = 4;

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(
      BookingCreateDto,
      {},
    );

    expect(REQUIRED_FIELDS_AMOUNT).toEqual(validation.length);

    commonValidations(validation, 'clientId');
    commonValidations(validation, 'professionalId');
    commonValidations(validation, 'appointmentTime');
    commonValidations(validation, 'date');
  });
});
