import {
  Body,
  Param,
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HttpResponse, HttpResponseToFront } from '@/utils/http-response';
import { AvailabilityService } from '@/modules/availabilities/availability.service';
import { AvailabilityCreateDto } from '@/modules/availabilities/dto/availability-create.dto';
import { AvailabilityUpdateDto } from '@/modules/availabilities/dto/availability-update.dto';
import AvailabilityFormatedDto from '@/modules/availabilities/dto/availability-formated.dto';

@ApiTags('Availability')
@Controller('availabilities')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  /**
   * Find Availability
   *
   * @param {string} id - Id to find availability
   *
   * @returns {HttpResponseToFront}
   */
  @ApiOperation({ summary: 'Find Availability' })
  @ApiResponse({ status: 200, type: HttpResponseToFront })
  @Get(':id')
  @HttpCode(200)
  async show(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpResponseToFront> {
    const availability = await this.availabilityService.show(id);

    return HttpResponse.foundSuccessfully(availability).transformToReponse();
  }

  /**
   * Find Professional Availabilities
   *
   * @param {string} id - Professional Id to find professional availabilities
   *
   * @returns {AvailabilityFormatedDto[]}
   */
  @ApiOperation({ summary: 'Find Professional Availability' })
  @ApiResponse({ status: 200, type: AvailabilityFormatedDto, isArray: true })
  @Get('professionals/:id')
  @HttpCode(200)
  async showByProfessionalId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AvailabilityFormatedDto[]> {
    return this.availabilityService.showAllByProfessionalId(id);
  }

  /**
   * Create Professional Availability
   *
   * @param {string} day - Day of the week
   * @param {number} professionalId - Professional ID
   * @param {string} scheduleStart - Start schedule
   * @param {string} scheduleEnd - End schedule
   *
   * @returns {HttpResponseToFront}
   */
  @ApiOperation({ summary: 'Create Availability' })
  @ApiResponse({ status: 201, type: HttpResponseToFront })
  @ApiBody({ type: AvailabilityCreateDto })
  @Post('/')
  @HttpCode(201)
  async store(
    @Body() availabilityCreateDto: AvailabilityCreateDto,
  ): Promise<HttpResponseToFront> {
    await this.availabilityService.store(availabilityCreateDto);

    return HttpResponse.successfullyCreated().transformToReponse();
  }

  /**
   * Update Professional Availability
   *
   * @param {number} id - Professional Availability ID
   * @param {string} day - Day of the week
   * @param {string} scheduleStart - Start schedule
   * @param {string} scheduleEnd - End schedule
   *
   * @returns {HttpResponseToFront}
   */
  @ApiOperation({ summary: 'Update Availability' })
  @ApiResponse({ status: 200, type: HttpResponseToFront })
  @ApiBody({ type: AvailabilityUpdateDto })
  @Put(':id')
  @HttpCode(201)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() availabilityUpdateDto: AvailabilityUpdateDto,
  ): Promise<HttpResponseToFront> {
    const availability = await this.availabilityService.update(
      id,
      availabilityUpdateDto,
    );

    return HttpResponse.updatedSuccessfully(availability).transformToReponse();
  }

  /**
   * Delete Availability
   *
   * @param {number} id - Id of Availability
   *
   * @returns {HttpResponseToFront}
   */
  @ApiOperation({ summary: 'Delete Availability' })
  @ApiResponse({ status: 200, type: HttpResponseToFront })
  @Delete(':id')
  @HttpCode(200)
  async destroy(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpResponseToFront> {
    await this.availabilityService.destroy(id);

    return HttpResponse.successfullyDeleted().transformToReponse();
  }
}
