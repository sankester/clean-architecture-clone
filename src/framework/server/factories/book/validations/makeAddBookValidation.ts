import { Validation } from '@adapter/contracts/Validation';
import { AddBookDto } from '@framework/server/factories/book/validations/dto/AddBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeAddBookValidation = (): Validation => {
  return new RequestParamsValidation(AddBookDto);
};
