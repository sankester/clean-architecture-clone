import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { Validation } from '@adapter/protocol/Validation';
import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { DeleteBookPresenter } from '../../presentation/presenters/book/DeleteBookPresenter';
import { Presenter } from '../../protocol/Presenter';

export class DeleteBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<DeleteBookPresenter.Data>,
    private readonly validation: Validation,
    private readonly deleteBook: DeleteBook
  ) {}

  async handle(request: DeleteBookController.Request): Promise<void> {
    const { badRequest, serverError } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        this.presenter.setOutput(badRequest(error));
      } else {
        const { bookId } = request;
        const deleted = await this.deleteBook.delete(bookId);
        this.presenter.transform(deleted);
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}

/* istanbul ignore next */
export namespace DeleteBookController {
  export type Request = {
    bookId: string;
  };
}
