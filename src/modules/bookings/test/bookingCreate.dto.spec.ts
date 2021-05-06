import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import { BookingCreateDto } from '@/modules/bookings/dto/booking-create.dto';
import commonValidations from '@/utils/common-validations';

describe('Test Booking Create DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(
      BookingCreateDto,
      {},
    );

    expect(4).toEqual(validation.length);

    commonValidations(validation, 'clientId');
    commonValidations(validation, 'professionalId');
    commonValidations(validation, 'appointmentTime');
    commonValidations(validation, 'date');
  });
});
