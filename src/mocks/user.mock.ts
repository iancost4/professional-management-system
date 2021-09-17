import * as faker from 'faker';

import UserDto from '@/modules/v1/users/dto/user.dto';
import { UserCreateDto } from '@/modules/v1/users/dto/userCreate.dto';

export const mockUser: UserDto = {
  id: faker.datatype.number(),
  name: faker.random.word(),
};

export const mockUserCreate: UserCreateDto = {
  name: faker.random.word(),
};

export const mockUserPromise: Promise<UserDto> = Promise.resolve(mockUser);
