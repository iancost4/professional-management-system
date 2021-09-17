import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '@/modules/v1/users/entities/user.entity';
import { UserCreateDto } from '@/modules/v1/users/dto/userCreate.dto';
import { exceptionsMessages } from '@/utils/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  /**
   * Find User
   *
   * @param {UserCreateDto} UserCreateDto
   *
   * @returns {User}
   */
  async show(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException(exceptionsMessages.user.notFoundError);
      }

      return user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Create User
   *
   * @param {UserCreateDto} UserCreateDto
   *
   * @returns {User}
   */
  async store(userCreateDto: UserCreateDto): Promise<User> {
    try {
      return this.userRepository.create(userCreateDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
