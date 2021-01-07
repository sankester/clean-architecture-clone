import { HttpResponse } from '@adapter/contracts';
import { Controller } from '@adapter/contracts/Controller';
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';
import { logger } from '@adapter/utils/winston';
import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { Validation } from '../../contracts/Validation';

export class DeleteBookController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteBook: DeleteBook
  ) {}

  async handle(
    request: DeleteBookController.Request,
    { makeBody, makeResponse }: ResponseFactory
  ): Promise<HttpResponse> {
    const { ok, badRequest, serverError } = makeResponse();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { bookId } = request;
      const deleted = await this.deleteBook.delete(bookId);
      const body =
        deleted === true
          ? makeBody().setSuccess(DeleteBookController.SuccessResponse)
          : makeBody().setError(
              'transaction_error',
              DeleteBookController.ErrorResponse
            );
      return ok(body.build());
    } catch (error) {
      logger.error(`DeleteBookController: ${error}`);
      return serverError(error);
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
