import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import Booking from '@/modules/bookings/entities/booking.entity';
import { BookingCreateDto } from '@/modules/bookings/dto/booking-create.dto';

import { AvailabilityService } from '@/modules/availabilities/availability.service';

import { UserService } from '@/modules/users/user.service';

import { HttpResponse } from '@/utils/http-response';

import weekday from '@/utils/weekday';
import formatDate from '@/utils/format-date';
import addAndSubMinutesToSchedule from '@/utils/addAndSubMinutesToSchedule';

@Injectable()
export class BookingService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(AvailabilityService)
    private readonly availabilityService: AvailabilityService,
    @InjectModel(Booking)
    private bookingRepository: typeof Booking,
  ) {}

  /**
   * Create Booking
   *
   * @param {BookingCreateDto} BookingCreateDto
   *
   * @returns {Booking}
   */
  async store(bookingCreateDto: BookingCreateDto): Promise<any> {
    try {
      await this.userService.show(bookingCreateDto.professionalId);
      await this.userService.show(bookingCreateDto.clientId);

      await this.validAvailableTime(bookingCreateDto.appointmentTime);

      await this.checkExistsAvailableTime(
        bookingCreateDto.appointmentTime,
        bookingCreateDto.professionalId,
        bookingCreateDto.date,
      );

      await this.checkAvailableTimeIsFree(
        bookingCreateDto.appointmentTime,
        bookingCreateDto.professionalId,
        bookingCreateDto.date,
      );

      return this.bookingRepository.create({
        date: formatDate(bookingCreateDto.date),
        appointmentTime: bookingCreateDto.appointmentTime,
        professionalId: bookingCreateDto.professionalId,
        clientId: bookingCreateDto.clientId,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Check if the professional has that schedule
   *
   * @param {string} schedule
   *
   * @returns {boolean}
   */
  async checkExistsAvailableTime(
    availableTime: string,
    professionalId: number,
    bookingDate: string,
  ): Promise<boolean> {
    try {
      const professionalAvailabilities = await this.availabilityService.showAllByProfessionalId(
        professionalId,
      );

      const date = formatDate(bookingDate);

      const day = weekday(date.getDay());

      const schedulesDay = professionalAvailabilities.find(
        (item) => item.day == day,
      );

      const existsSchedule = schedulesDay.availableTimes.find(
        (item) => item.availableTime == availableTime,
      );

      if (!existsSchedule) throw HttpResponse.invalidDate();

      return true;
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
  async validAvailableTime(schedule: string): Promise<boolean> {
    try {
      const myRe = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):(00|30)$');
      const validSchedule = myRe.exec(schedule);

      if (!validSchedule) throw HttpResponse.invalidData();

      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  /**
   * Check if the professional has that schedule
   *
   * @param {string} schedule
   *
   * @returns {boolean}
   */
  async checkAvailableTimeIsFree(
    appointmentTime: string,
    professionalId: number,
    bookingDate: string,
  ): Promise<boolean> {
    try {
      const timeToCheck = addAndSubMinutesToSchedule(appointmentTime, 30);

      const availableTimeIsFree = await this.bookingRepository.findOne({
        where: {
          appointmentTime: {
            [Op.in]: timeToCheck,
          },
          professionalId,
          date: formatDate(bookingDate),
        },
      });

      if (availableTimeIsFree) throw HttpResponse.invalidDate();

      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
