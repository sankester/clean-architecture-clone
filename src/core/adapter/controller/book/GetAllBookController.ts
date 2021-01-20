/* eslint-disable @typescript-eslint/no-unused-vars */
import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { GetAllBookPresenter } from '@adapter/presentation/presenters/book/GetAllBookPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { GetAllBook } from '@entities/usecases/book/GetAllBook';

export class GetAllBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<GetAllBookPresenter.Data>,
    private readonly getAllBook: GetAllBook
  ) {}

  async handle(_request: any): Promise<void> {
    const { serverError } = makeResponseFactory();
    try {
      const docs = await this.getAllBook.findAll();
      this.presenter.transform(docs);
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      this.presenter.setOutput(serverError(error));
    }
  }
}
