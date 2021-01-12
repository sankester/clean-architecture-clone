import { Validation } from '@adapter/protocol/Validation';
import { AddBookDto } from '@framework/server/factories/validations/book/dto/AddBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeAddBookValidation = (): Validation => {
  return new RequestParamsValidation(AddBookDto);
};
