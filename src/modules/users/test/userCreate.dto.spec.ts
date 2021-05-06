import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import { UserCreateDto } from '@/modules/users/dto/user-create.dto';
import commonValidations from '@/utils/common-validations';

describe('Test User Create DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(UserCreateDto, {});

    expect(1).toEqual(validation.length);

    commonValidations(validation, 'name');
  });
});
