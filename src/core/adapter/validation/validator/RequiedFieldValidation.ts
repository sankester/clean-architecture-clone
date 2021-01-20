import { Validation } from '../../protocol/Validation';
import { MissingParamError } from '../../presentation/errors/MissingParams';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  async validate(input: any): Promise<Error | void | null> {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
