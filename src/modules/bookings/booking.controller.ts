import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HttpResponse, HttpResponseToFront } from '@/utils/http-response';
import { BookingService } from '@/modules/bookings/booking.service';
import { BookingCreateDto } from '@/modules/bookings/dto/booking-create.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Create Booking
   *
   * @param {string} schedule - Name to identify Booking
   * @param {date} date - Date Booking
   * @param {number} clientId - ID to identify Client
   * @param {number} professionalId - ID to identify Professional
   *
   * @returns {HttpResponseToFront}
   */
  @ApiOperation({ summary: 'Create Booking' })
  @ApiResponse({ status: 201, type: HttpResponseToFront })
  @ApiBody({ type: BookingCreateDto })
  @Post('/')
  @HttpCode(201)
  async create(
    @Body() bookingCreateDto: BookingCreateDto,
  ): Promise<HttpResponseToFront> {
    const booking = await this.bookingService.create(bookingCreateDto);

    return HttpResponse.successfullyCreated(booking).transformToReponse();
  }
}
