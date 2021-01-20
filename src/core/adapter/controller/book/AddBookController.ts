import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { AddBookPresenter } from '@adapter/presentation/presenters/book/AddBookPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { AddBook } from '@entities/usecases/book/AddBook';

export class AddBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<AddBookPresenter.Data>,
    private readonly addBook: AddBook
  ) {}

  async handle(request: AddBookController.Request): Promise<void> {
    const { serverError } = makeResponseFactory();

    try {
      const isSuccess = await this.addBook.add(request);
      this.presenter.transform(isSuccess);
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      this.presenter.setOutput(serverError(error));
    }
  }
}

/* istanbul ignore next */
export namespace AddBookController {
  export type Request = AddBook.Params;
}
