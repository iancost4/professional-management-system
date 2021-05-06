import * as faker from 'faker';

import { mockUser } from '@/mocks/user.mock';
import { validateSpecificDto } from '@/validations/validateSpecificDto.validator';
import UserDto from '@/modules/users/dto/user.dto';
import commonValidations from '@/utils/common-validations';

describe('Test User DTO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Validation required fields', async () => {
    const validation: Array<any> = await validateSpecificDto(UserDto, {});
    expect(1).toEqual(validation.length);

    commonValidations(validation, 'name');
  });

  it('Validate if is the correct type', async () => {
    const successCase: Array<any> = await validateSpecificDto(
      UserDto,
      mockUser,
    );

    expect(0).toEqual(successCase.length);

    const failedCase: Array<any> = await validateSpecificDto(UserDto, {
      id: faker.random.word(),
      name: faker.datatype.number(),
    });

    expect(2).toEqual(failedCase.length);
  });
});
