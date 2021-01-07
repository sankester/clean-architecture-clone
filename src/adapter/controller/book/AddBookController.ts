import { AddBook } from '@entities/usecases/book/AddBook';
import { HttpResponse } from '@adapter/protocols';
import { Controller } from '@adapter/protocols/Controller';
import { logger } from '@adapter/utils/winston';
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';

export class AddBookController implements Controller {
  constructor(private readonly addBook: AddBook) {}

  async handle(
    request: AddBookController.Request,
    { makeBody, makeResponse }: ResponseFactory
  ): Promise<HttpResponse> {
    const { created, ok, serverError } = makeResponse();
    try {
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
      logger.error(`AddBookController: ${error}`);
      return serverError(error);
    }
  }
}

export namespace AddBookController {
  export type Request = {
    title: string;
    author: string;
    issn: string;
  };

  export const ErrorMessage = 'gagal menambah data buku';

  export const SuccessMessage = 'berhasil menambah data buku';
}
