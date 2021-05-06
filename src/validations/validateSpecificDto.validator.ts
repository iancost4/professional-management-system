import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validateSpecificDto = async (
  dtoClass: any,
  body: any,
): Promise<any> => {
  const output: any = plainToClass(dtoClass, body);
  let errorTexts = [];
  await validate(output).then((errors) => {
    if (errors.length > 0) {
      for (const errorItem of errors) {
        errorTexts = errorTexts.concat({
          property: errorItem.property,
          constraints: errorItem.constraints,
        });
      }
    }
  });
  return errorTexts;
};
