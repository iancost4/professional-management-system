import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import Availability from '@/modules/v1/availabilities/entities/availability.entity';
import AvailabilityDto from '@/modules/v1/availabilities/dto/availability.dto';
import { AvailabilityCreateDto } from '@/modules/v1/availabilities/dto/availabilityCreate.dto';
import { AvailabilityUpdateDto } from '@/modules/v1/availabilities/dto/availabilityUpdate.dto';
import AvailabilityFormatedDto from '@/modules/v1/availabilities/dto/availabilityFormated.dto';

import { UserService } from '@/modules/v1/users/user.service';

import { exceptionsMessages } from '@/utils/exceptions';

@Injectable()
export class AvailabilityService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @InjectModel(Availability)
    private availabilityRepository: typeof Availability,
  ) {}

  /**
   * Find Availability
   *
   * @param {number} id
   *
   * @returns {Availability}
   */
  async show(id: number): Promise<Availability> {
    try {
      const availability = await this.availabilityRepository.findByPk(id);

      if (!availability) {
        throw new NotFoundException(
          exceptionsMessages.availability.notFoundError,
        );
      }

      return availability;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Find All Availabilities by Profession ID
   *
   * @param {number} id
   *
   * @returns {AvailabilityFormatedDto[]}
   */
  async showAllByProfessionalId(
    id: number,
  ): Promise<AvailabilityFormatedDto[]> {
    try {
      await this.userService.show(id);

      const availabilities = await this.availabilityRepository.findAll({
        where: {
          professionalId: id,
        },
        order: ['availableTime'],
      });

      return this.formatProfessionalAvailabilities(availabilities);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  /**
   * Create Professional Availabilities
   *
   * @param {AvailabilityCreateDto} availabilityCreateDto
   *
   * @returns {Availability}
   */
  async store(availabilityCreateDto: AvailabilityCreateDto): Promise<boolean> {
    try {
      await this.userService.show(availabilityCreateDto.professionalId);

      await this.validAvailableTime(
        availabilityCreateDto.availableTimeStart,
        availabilityCreateDto.availableTimeEnd,
      );

      const availableTimes = await this.formatAvailableTimes(
        availabilityCreateDto.availableTimeStart,
        availabilityCreateDto.availableTimeEnd,
      );

      availableTimes.map((availableTime) => {
        this.availabilityRepository.findOrCreate({
          where: {
            professionalId: availabilityCreateDto.professionalId,
            day: availabilityCreateDto.day,
            availableTime: availableTime,
          },
        });
      });

      return true;
    } catch (e) {
      if (
        e instanceof NotFoundException ||
        e instanceof UnprocessableEntityException
      ) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Update Availability
   *
   * @param {AvailabilityCreateDto} availabilityCreateDto
   *
   * @returns {Availability}
   */
  async update(
    id: number,
    availabilityUpdateDto: AvailabilityUpdateDto,
  ): Promise<AvailabilityDto> {
    try {
      const availability = await this.availabilityRepository.findOne({
        where: {
          id,
        },
      });

      if (!availability) {
        throw new NotFoundException(
          exceptionsMessages.availability.notFoundError,
        );
      }

      availability.day = availabilityUpdateDto.day;
      availability.availableTime = availabilityUpdateDto.availableTime;

      await availability.save();

      return availability;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Delete Availability
   *
   * @param {number} id
   *
   * @returns {boolean}
   */
  async destroy(id: number): Promise<boolean> {
    try {
      const availability = await this.availabilityRepository.findOne({
        where: {
          id,
        },
      });

      if (!availability) {
        throw new NotFoundException(
          exceptionsMessages.availability.notFoundError,
        );
      }

      await availability.destroy();

      return true;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Format Professional Availabilities
   *
   * @param {AvailabilityDto[]} availabilities
   *
   * @returns {AvailabilityFormatedDto[]}
   */
  async formatProfessionalAvailabilities(
    availabilities: AvailabilityDto[],
  ): Promise<AvailabilityFormatedDto[]> {
    try {
      const response = [
        { day: 'MONDAY', availableTimes: [] },
        { day: 'TUESDAY', availableTimes: [] },
        { day: 'WEDNESDAY', availableTimes: [] },
        { day: 'THURSDAY', availableTimes: [] },
        { day: 'FRIDAY', availableTimes: [] },
        { day: 'SATURDAY', availableTimes: [] },
        { day: 'SUNDAY', availableTimes: [] },
      ];

      availabilities.map((item) => {
        response.map((res) => {
          if (res.day == item.day) {
            res.availableTimes.push({
              availableTime: item.availableTime,
              id: item.id,
            });
          }
        });
      });

      return response;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  /**
   * Valid Available Time
   *
   * @param {string} scheduleStart
   * @param {string} scheduleEnd
   *
   * @returns {boolean}
   */
  async validAvailableTime(
    availableTimeStart: string,
    availableTimeEnd: string,
  ): Promise<boolean> {
    try {
      const myRe = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):(00|30)$');
      const validAvailableTimeStart = myRe.exec(availableTimeStart);
      const validAvailableTimeEnd = myRe.exec(availableTimeEnd);
      let validResponse = false;

      if (validAvailableTimeStart && validAvailableTimeEnd) {
        if (validAvailableTimeStart[1] < validAvailableTimeEnd[1]) {
          validResponse = true;
        } else {
          if (validAvailableTimeStart[1] == validAvailableTimeEnd[1]) {
            if (validAvailableTimeStart[2] <= validAvailableTimeEnd[2]) {
              validResponse = true;
            }
          }
        }
      }

      if (!validResponse) {
        throw new UnprocessableEntityException(
          exceptionsMessages.availability.unprocessableTimeEntityError,
        );
      }

      return validResponse;
    } catch (e) {
      if (e instanceof UnprocessableEntityException) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Format Professional Availabilities
   *
   * @param {string} scheduleStart
   * @param {string} scheduleEnd
   *
   * @returns {Array<any>}
   */
  async formatAvailableTimes(
    availableTimeStart: string,
    availableTimeEnd: string,
  ): Promise<Array<any>> {
    try {
      const myRe = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):(00|30)$');
      const regexScheduleStart = myRe.exec(availableTimeStart);
      const regexScheduleEnd = myRe.exec(availableTimeEnd);

      const dateNow = new Date();
      const dateStart = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDay(),
      );
      const dateEnd = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDay(),
      );

      dateStart.setHours(parseInt(regexScheduleStart[1]));
      dateStart.setMinutes(parseInt(regexScheduleStart[2]));

      dateEnd.setHours(parseInt(regexScheduleEnd[1]));
      dateEnd.setMinutes(parseInt(regexScheduleEnd[2]));

      const diff = Math.abs(dateEnd.getTime() - dateStart.getTime());
      let diffInMinutes = Math.floor(diff / 1000 / 60);

      if (diffInMinutes < 60) {
        throw new UnprocessableEntityException(
          exceptionsMessages.availability.unprocessableShortTimeEntityError,
        );
      }

      const response = [];
      while (diffInMinutes >= 60) {
        const hour =
          dateStart.getHours() < 10
            ? '0' + dateStart.getHours()
            : dateStart.getHours();
        const minutes = dateStart.getMinutes() == 0 ? '00' : '30';

        response.push(`${hour}:${minutes}`);

        dateStart.setMinutes(dateStart.getMinutes() + 30);

        diffInMinutes = diffInMinutes - 30;
      }

      return response;
    } catch (e) {
      if (
        e instanceof NotFoundException ||
        e instanceof UnprocessableEntityException
      ) {
        throw e;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Check Available Time is Free
   *
   * @param {number} id
   *
   * @returns {Availability}
   */
  async checkAvailableTimeIsFree(
    availableTime: string,
    professionalId: number,
    date: Date,
  ): Promise<boolean> {
    try {
      const availability = await this.availabilityRepository.findOne({
        where: {
          availableTime,
          professionalId,
          date,
        },
      });

      if (!availability) return false;

      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
