import { HttpResponse } from '@/utils/http-response';
import User from '@/modules/v1/users/entities/user.entity';
import { UserController } from '@/modules/v1/users/user.controller';
import { UserService } from '@/modules/v1/users/user.service';
import { mockUser, mockUserCreate, mockUserPromise } from '@/mocks/user.mock';

describe('Test User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(User);
    userController = new UserController(userService);
    jest.clearAllMocks();

    jest
      .spyOn(userService, 'store')
      .mockReturnValue(
        Promise.resolve(mockUserPromise as unknown as Promise<User>),
      );
  });

  it('Create a new user.', async () => {
    const response = await userController.store(mockUserCreate);

    expect(response).toStrictEqual(
      HttpResponse.successfullyCreated(mockUser).transformToReponse(),
    );
  });
});
