import { Validation } from '@adapter/protocol/Validation';
import { AddBookDto } from '@backend/infrastructure/common/factories/validations/dto/book/AddBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeAddBookValidation = (): Validation => {
  return new RequestParamsValidation(AddBookDto);
};
