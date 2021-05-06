import * as faker from 'faker';

import UserDto from '@/modules/users/dto/user.dto';
import { UserCreateDto } from '@/modules/users/dto/user-create.dto';

export const mockUser: UserDto = {
  id: faker.datatype.number(),
  name: faker.random.word(),
};

export const mockUserCreate: UserCreateDto = {
  name: faker.random.word(),
};

export const mockUserPromise: Promise<UserDto> = Promise.resolve(mockUser);
