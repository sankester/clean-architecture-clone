import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';
import { HttpResponse } from '@adapter/protocols';
import { Controller } from '@adapter/protocols/Controller';
import { UpdateBook } from '@entities/usecases/UpdateBook';
import { logger } from '@adapter/utils/winston';

export class UpdateBookController implements Controller {
  constructor(private readonly updateBook: UpdateBook) {}

  async handle(
    request: AddBookController.Request,
    { makeResponse, makeBody }: ResponseFactory
  ): Promise<HttpResponse> {
    const { ok, serverError } = makeResponse();
    try {
      const { bookId } = request;
      const params: UpdateBook.Params = {
        title: request.title,
        author: request.author,
        issn: request.issn,
      };
      const updated = await this.updateBook.update(bookId, params);
      let body = makeBody();
      body = updated
        ? body.setData(updated)
        : body.setError('transaction_error', AddBookController.ErrorMessage);
      return ok(body.build());
    } catch (error) {
      logger.error(`UpdateBookController: ${error}`);
      return serverError(error);
    }
  }
}

export namespace AddBookController {
  export type Request = UpdateBook.Params & { bookId: string };

  export const ErrorMessage = 'gagal merubah data buku';

  export const SuccessMessage = 'berhasil merubah data buku';
}
