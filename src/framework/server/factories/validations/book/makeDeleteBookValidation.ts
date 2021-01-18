import { Validation } from '@adapter/protocol/Validation';
import { DeleteBookDto } from '@framework/server/factories/validations/dto/book/DeleteBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeDeleteBookValidation = (): Validation => {
  return new RequestParamsValidation(DeleteBookDto);
};
