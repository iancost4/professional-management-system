import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HttpResponse, HttpResponseToFront } from '@/utils/http-response';
import { BookingService } from '@/modules/v1/bookings/booking.service';
import { BookingCreateDto } from '@/modules/v1/bookings/dto/bookingCreate.dto';

@ApiTags('v1/bookings')
@Controller('v1/bookings')
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
  async store(
    @Body() bookingCreateDto: BookingCreateDto,
  ): Promise<HttpResponseToFront> {
    const booking = await this.bookingService.store(bookingCreateDto);

    return HttpResponse.successfullyCreated(booking).transformToReponse();
  }
}
