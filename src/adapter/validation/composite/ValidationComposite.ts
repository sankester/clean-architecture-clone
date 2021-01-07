import { Validation } from '../../contracts/Validation';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  async validate(input: any): Promise<void | Error> {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
