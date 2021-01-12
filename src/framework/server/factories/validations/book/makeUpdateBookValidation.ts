import { Validation } from '@adapter/protocol/Validation';
import { UpdateBookDto } from '@adapter/validation/dto/book/UpdateBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeUpdateBookValidation = (): Validation => {
  return new RequestParamsValidation(UpdateBookDto);
};
