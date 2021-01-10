import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { Validation } from '@adapter/protocol/Validation';
import { AddBook } from '@entities/usecases/book/AddBook';
import { Presenter } from '../../protocol/Presenter';
import { AddBookPresenter } from '../../presentation/presenter/book/AddBookPresenter';

export class AddBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<AddBookPresenter.Data>,
    private readonly validation: Validation,
    private readonly addBook: AddBook
  ) {}

  async handle(request: AddBookController.Request): Promise<void> {
    const { serverError, badRequest } = makeResponseFactory();

    try {
      const error = await this.validation.validate(request);
      if (error) {
        this.presenter.setOutput(badRequest(error));
      } else {
        const isSuccess = await this.addBook.add(request);
        this.presenter.transform(isSuccess);
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}

/* istanbul ignore next */
export namespace AddBookController {
  export type Request = AddBook.Params;
}
