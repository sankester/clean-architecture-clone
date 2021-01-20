import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { GetBookByIdPresenter } from '@adapter/presentation/presenters/book/GetBookByIdPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { GetBookById } from '@entities/usecases/book/GetBookById';

export class GetBookByIdController implements Controller {
  constructor(
    private readonly presenter: Presenter<GetBookByIdPresenter.Data>,
    private readonly getBookById: GetBookById
  ) {}

  async handle(request: GetBookByIdController.Request): Promise<void> {
    const { serverError } = makeResponseFactory();
    try {
      const { bookId } = request;
      const data = await this.getBookById.getById(bookId);
      this.presenter.transform(data);
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      this.presenter.setOutput(serverError(error));
    }
  }
}

export namespace GetBookByIdController {
  export type Request = {
    bookId: string;
  };
}
