import * as faker from 'faker';

import AvailabilityDto from '@/modules/availabilities/dto/availability.dto';
import { AvailabilityCreateDto } from '@/modules/availabilities/dto/availability-create.dto';
import AvailabilityFormatedDto from '@/modules/availabilities/dto/availability-formated.dto';
import { AvailabilityUpdateDto } from '@/modules/availabilities/dto/availability-update.dto';

export const mockAvailability: AvailabilityDto = {
  id: faker.datatype.number(),
  day: faker.date.weekday(),
  availableTime: '08:30',
  professionalId: faker.datatype.number(),
};

export const mockAvailabilityCreate: AvailabilityCreateDto = {
  day: faker.random.word(),
  availableTimeStart: faker.random.word(),
  availableTimeEnd: faker.random.word(),
  professionalId: faker.datatype.number(),
};

export const mockAvailabilityUpdate: AvailabilityUpdateDto = {
  day: faker.random.word(),
  availableTime: faker.random.word(),
};

export const mockAvailabilityPromise: Promise<AvailabilityDto> = Promise.resolve(
  mockAvailability,
);

export const mockAvailabilityFormated: AvailabilityFormatedDto[] = [
  {
    day: 'MONDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
  {
    day: 'TUESDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
  {
    day: 'WEDNESDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
  {
    day: 'THURSDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
  {
    day: 'FRIDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
  {
    day: 'SATURDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
  {
    day: 'SUNDAY',
    availableTimes: ['08:30', '09:00', '10:00'],
  },
];

export const mockAvailabilityFormatedPromise: Promise<
  AvailabilityFormatedDto[]
> = Promise.resolve(mockAvailabilityFormated);
