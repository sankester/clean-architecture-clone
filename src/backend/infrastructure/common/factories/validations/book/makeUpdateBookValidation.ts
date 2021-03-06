import { Validation } from '@adapter/protocol/Validation';
import { UpdateBookDto } from '@backend/infrastructure/common/factories/validations/dto/book/UpdateBookDto';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';

export const makeUpdateBookValidation = (): Validation => {
  return new RequestParamsValidation(UpdateBookDto);
};
