import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { UpdateBookPresenter } from '@adapter/presentation/presenters/book/UpdateBookPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { UpdateBook } from '@entities/usecases/book/UpdateBook';

export class UpdateBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<UpdateBookPresenter.Data>,
    private readonly updateBook: UpdateBook
  ) {}

  async handle(request: UpdateBookController.Request): Promise<void> {
    const { serverError } = makeResponseFactory();
    try {
      const { bookId } = request;
      const params: UpdateBook.Params = {
        title: request.title,
        author: request.author,
        issn: request.issn,
      };
      const updated = await this.updateBook.update(bookId, params);
      this.presenter.transform(updated);
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      this.presenter.setOutput(serverError(error));
    }
  }
}

/* istanbul ignore next */
export namespace UpdateBookController {
  export type Request = UpdateBook.Params & { bookId: string };
}
