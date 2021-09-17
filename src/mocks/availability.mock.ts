import * as faker from 'faker';

import { Days } from '@/utils/days.enum';
import AvailabilityDto from '@/modules/v1/availabilities/dto/availability.dto';
import AvailabilityFormatedDto from '@/modules/v1/availabilities/dto/availabilityFormated.dto';
import { AvailabilityCreateDto } from '@/modules/v1/availabilities/dto/availabilityCreate.dto';
import { AvailabilityUpdateDto } from '@/modules/v1/availabilities/dto/availabilityUpdate.dto';

export const mockAvailability: AvailabilityDto = {
  id: faker.datatype.number(),
  day: faker.date.weekday(),
  availableTime: '08:30',
  professionalId: faker.datatype.number(),
};

export const mockAvailabilityCreate: AvailabilityCreateDto = {
  day: Days.MONDAY,
  availableTimeStart: faker.random.word(),
  availableTimeEnd: faker.random.word(),
  professionalId: faker.datatype.number(),
};

export const mockAvailabilityUpdate: AvailabilityUpdateDto = {
  day: faker.random.word(),
  availableTime: faker.random.word(),
};

export const mockAvailabilityPromise: Promise<AvailabilityDto> =
  Promise.resolve(mockAvailability);

export const mockAvailabilityFormated: AvailabilityFormatedDto[] = [
  {
    day: 'MONDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
  {
    day: 'TUESDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
  {
    day: 'WEDNESDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
  {
    day: 'THURSDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
  {
    day: 'FRIDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
  {
    day: 'SATURDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
  {
    day: 'SUNDAY',
    availableTimes: [
      { availableTime: '08:00', id: 1 },
      { availableTime: '08:30', id: 2 },
      { availableTime: '09:00', id: 3 },
      { availableTime: '09:30', id: 4 },
    ],
  },
];

export const mockAvailabilityFormatedPromise: Promise<
  AvailabilityFormatedDto[]
> = Promise.resolve(mockAvailabilityFormated);
