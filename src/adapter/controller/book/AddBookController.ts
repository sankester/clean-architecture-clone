import { HttpResponse } from '@adapter/contracts';
import { Controller } from '@adapter/contracts/Controller';
import { Validation } from '@adapter/contracts/Validation';
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';
import { logger } from '@adapter/utils/winston';
import { AddBook } from '@entities/usecases/book/AddBook';

export class AddBookController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addBook: AddBook
  ) {}

  async handle(
    request: AddBookController.Request,
    { makeBody, makeResponse }: ResponseFactory
  ): Promise<HttpResponse> {
    const { created, ok, serverError, badRequest } = makeResponse();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const isSuccess = await this.addBook.add(request);
      return isSuccess
        ? created(
            makeBody().setSuccess(AddBookController.SuccessMessage).build()
          )
        : ok(
            makeBody()
              .setError('transaction_error', AddBookController.ErrorMessage)
              .build()
          );
    } catch (error) {
      logger.error(`AddBookController: ${error.message}`);
      return serverError(error);
    }
  }
}

export namespace AddBookController {
  export type Request = AddBook.Params;

  export const ErrorMessage = 'gagal menambah data buku';

  export const SuccessMessage = 'berhasil menambah data buku';
}
