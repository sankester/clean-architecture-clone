import { Validation } from '@adapter/protocol/Validation';
import { MissingParamError } from '@adapter/presentation/errors/MissingParams';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';

export class RequestParamsValidation<T> implements Validation {
  constructor(private dto: ClassType<T>) {}

  async validate(inputs: any): Promise<void | Error | null> {
    const data = plainToClass(this.dto, inputs);
    const errors = await validate(data, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      const error = {};
      for (const errorItem of errors) {
        const constrain: any = errorItem.constraints;
        error[errorItem.property] = constrain[Object.keys(constrain)[0]];
      }

      return new MissingParamError(JSON.stringify(error));
    }
  }
}
