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
