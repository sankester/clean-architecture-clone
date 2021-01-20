import { Validation } from '@adapter/protocol/Validation';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  async validate(input: any): Promise<void | Error | null> {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
