import { Validation } from '@adapter/protocol/Validation';
import { AddBookDto } from '@adapter/validation/dto/book/AddBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeAddBookValidation = (): Validation => {
  return new RequestParamsValidation(AddBookDto);
};
