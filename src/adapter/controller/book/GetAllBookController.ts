/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { GetAllBookPresenter } from '../../presentation/presenters/book/GetAllBookPresenter';
import { Presenter } from '../../protocol/Presenter';

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
      this.presenter.setOutput(serverError(error));
    }
  }
}
