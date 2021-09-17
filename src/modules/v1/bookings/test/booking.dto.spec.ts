import * as faker from 'faker';

import { mockUser } from '@/mocks/user.mock';
import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import UserDto from '@/modules/v1/users/dto/user.dto';
import commonValidations from '@/utils/common-validations';

describe('Test User DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const REQUIRED_FIELDS_AMOUNT = 1;
  const INCORRECT_FIELDS_AMOUNT = 2;
  const SUCCESS = 0;

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(UserDto, {});
    expect(REQUIRED_FIELDS_AMOUNT).toEqual(validation.length);

    commonValidations(validation, 'name');
  });

  it('Validate if is the correct type', async () => {
    const successCase: Array<any> = await validateSpecificDto(
      UserDto,
      mockUser,
    );

    expect(SUCCESS).toEqual(successCase.length);

    const failedCase: Array<any> = await validateSpecificDto(UserDto, {
      id: faker.random.word(),
      name: faker.datatype.number(),
    });

    expect(INCORRECT_FIELDS_AMOUNT).toEqual(failedCase.length);
  });
});
