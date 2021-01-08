import { Validation } from '@adapter/protocol/Validation';

export class ValidationSpy implements Validation {
  error: Error | null = null;
  input: any;

  async validate(input: any): Promise<Error | null | void> {
    this.input = input;
    return this.error;
  }
}
