import { Validation } from '@adapter/contracts/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { UpdateBookDto } from '@framework/server/factories/book/validations/dto/UpdateBookDto';

export const makeUpdateBookValidation = (): Validation => {
  return new RequestParamsValidation(UpdateBookDto);
};
