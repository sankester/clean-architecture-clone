export interface Validation {
  validate(input: any): Promise<Error | void | null>;
}
