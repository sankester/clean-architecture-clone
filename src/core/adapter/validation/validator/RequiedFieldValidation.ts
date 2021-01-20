import { MissingParamError } from '@adapter/presentation/errors/MissingParams';
import { Validation } from '@adapter/protocol/Validation';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  async validate(input: any): Promise<Error | void | null> {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
