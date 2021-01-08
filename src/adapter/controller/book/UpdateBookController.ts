import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Response } from '@adapter/presentation/protocol/Response';
import { Controller } from '@adapter/protocol/Controller';
import { Validation } from '@adapter/protocol/Validation';
import { UpdateBook } from '@entities/usecases/book/UpdateBook';

export class UpdateBookController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateBook: UpdateBook
  ) {}

  async handle(request: UpdateBookController.Request): Promise<Response> {
    const { ok, serverError, badRequest } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { bookId } = request;
      const params: UpdateBook.Params = {
        title: request.title,
        author: request.author,
        issn: request.issn,
      };
      const updated = await this.updateBook.update(bookId, params);
      let body = makeBodyBuilder();
      body = updated
        ? body.setData(updated).setSuccess(UpdateBookController.SuccessMessage)
        : body.setError('transaction_error', UpdateBookController.ErrorMessage);
      return ok(body.build());
    } catch (error) {
      return serverError(error);
    }
  }
}

/* istanbul ignore next */
export namespace UpdateBookController {
  export type Request = UpdateBook.Params & { bookId: string };

  export const ErrorMessage = 'gagal merubah data buku';

  export const SuccessMessage = 'berhasil merubah data buku';
}
