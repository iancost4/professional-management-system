import { Model } from 'sequelize-typescript';
import { FindOptions } from 'sequelize';
import { plainToClass } from 'class-transformer';
import { FilterInterface } from '@/modules/core/interfaces/filter.interface';
import { PaginatedResultDto } from '@/modules/core/dto/resultPaginated.dto';

export const includeModels = (models: typeof Model[]) => ({
  include: models.map((model) => ({ model, as: model.name.toLowerCase() })),
});

export const serializePagination = (
  Dto: typeof PaginatedResultDto,
  paginatedList = { data: [] },
) => {
  return plainToClass(Dto, {
    ...paginatedList,
    data: paginatedList.data.map((item) =>
      item?.get ? item.get({ plain: true }) : item,
    ),
  });
};

export const pagination = <T>(
  data: T[],
  { page = 1, perPage = 10 }: FilterInterface,
) => ({
  totalCount: data.length,
  page,
  perPage,
  data,
});

export const parseParams = <T = Record<string, any>>(
  params: FilterInterface & T,
): FindOptions => {
  const { page = 1, perPage = 10, order, where } = params;

  const offset = (page - 1) * perPage;
  const { sortField = 'id', sortOrder = 'DESC' } = order || {};

  return {
    where,
    limit: perPage,
    order: [[sortField, sortOrder]],
    offset,
  };
};