import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Response } from '@adapter/presentation/protocol/Response';
import { Controller } from '@adapter/protocol/Controller';
import { Validation } from '@adapter/protocol/Validation';
import { AddBook } from '@entities/usecases/book/AddBook';

export class AddBookController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addBook: AddBook
  ) {}

  async handle(request: AddBookController.Request): Promise<Response> {
    const { created, ok, serverError, badRequest } = makeResponseFactory();

    try {
      const error = await this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const isSuccess = await this.addBook.add(request);
      return isSuccess
        ? created(
            makeBodyBuilder()
              .setSuccess(AddBookController.SuccessMessage)
              .build()
          )
        : ok(
            makeBodyBuilder()
              .setError('transaction_error', AddBookController.ErrorMessage)
              .build()
          );
    } catch (error) {
      return serverError(error);
    }
  }
}

/* istanbul ignore next */
export namespace AddBookController {
  export type Request = AddBook.Params;
  export const ErrorMessage = 'gagal menambah data buku';
  export const SuccessMessage = 'berhasil menambah data buku';
}
