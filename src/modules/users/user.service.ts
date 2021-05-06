import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '@/modules/users/entities/user.entity';
import { UserCreateDto } from '@/modules/users/dto/user-create.dto';

import { HttpResponse } from '@/utils/http-response';

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

      if (!user) throw HttpResponse.notFound();

      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
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
