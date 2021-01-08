import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Response } from '@adapter/presentation/protocol/Response';
import { Controller } from '@adapter/protocol/Controller';
import { Validation } from '@adapter/protocol/Validation';
import { DeleteBook } from '@entities/usecases/book/DeleteBook';

export class DeleteBookController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteBook: DeleteBook
  ) {}

  async handle(request: DeleteBookController.Request): Promise<Response> {
    const { ok, badRequest, serverError } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { bookId } = request;
      const deleted = await this.deleteBook.delete(bookId);
      const body =
        deleted === true
          ? makeBodyBuilder().setSuccess(DeleteBookController.SuccesMessage)
          : makeBodyBuilder().setError(
              'transaction_error',
              DeleteBookController.ErrorMessage
            );
      return ok(body.build());
    } catch (error) {
      return serverError(error);
    }
  }
}

/* istanbul ignore next */
export namespace DeleteBookController {
  export type Request = {
    bookId: string;
  };

  export const ErrorMessage = 'gagal menghapus buku';

  export const SuccesMessage = 'berhasil menghapus data buku';
}
