import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { AddBook } from '@entities/usecases/book/AddBook';
import { AddBookPresenter } from '../../presentation/presenters/book/AddBookPresenter';
import { Presenter } from '../../protocol/Presenter';

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
      this.presenter.setOutput(serverError(error));
    }
  }
}

/* istanbul ignore next */
export namespace AddBookController {
  export type Request = AddBook.Params;
}
