import { HttpResponse } from '@adapter/protocols';
import { Controller } from '@adapter/protocols/Controller';
import { DeleteBook } from '@entities/usecases/DeleteBook';
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';
import { logger } from '@adapter/utils/winston';

export class DeleteBookController implements Controller {
  constructor(private readonly deleteBook: DeleteBook) {}

  async handle(
    request: DeleteBookController.Request,
    { makeBody, makeResponse }: ResponseFactory
  ): Promise<HttpResponse> {
    try {
      console.log(request);
      const { bookId } = request;

      const deleted = await this.deleteBook.delete(bookId);
      const body =
        deleted === true
          ? makeBody().setSuccess(DeleteBookController.SuccessResponse)
          : makeBody().setError(
              'transaction_error',
              DeleteBookController.ErrorResponse
            );
      return makeResponse().ok(body.build());
    } catch (error) {
      logger.error(`DeleteBookController: ${error}`);
      return makeResponse().serverError(error);
    }
  }
}

export namespace DeleteBookController {
  export type Request = {
    bookId: string;
  };

  export const ErrorResponse = 'gagal menghapus buku';

  export const SuccessResponse = 'berhasil menghapus data buku';
}
