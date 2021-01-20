import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { DeleteBookPresenter } from '@adapter/presentation/presenters/book/DeleteBookPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { DeleteBook } from '@entities/usecases/book/DeleteBook';

export class DeleteBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<DeleteBookPresenter.Data>,
    private readonly deleteBook: DeleteBook
  ) {}

  async handle(request: DeleteBookController.Request): Promise<void> {
    const { serverError } = makeResponseFactory();
    try {
      const { bookId } = request;
      const deleted = await this.deleteBook.delete(bookId);
      this.presenter.transform(deleted);
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
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
