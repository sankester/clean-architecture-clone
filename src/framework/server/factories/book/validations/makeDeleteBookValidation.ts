import { Validation } from '@adapter/contracts/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { DeleteBookDto } from './dto/DeleteBookDto';

export const makeDeleteBookValidation = (): Validation => {
  return new RequestParamsValidation(DeleteBookDto);
};
