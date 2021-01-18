import { GetBookById } from '@entities/usecases/book/GetBookById';
import { makeResponseFactory } from '../../presentation/helpers/makeResponseFactory';
import { GetBookByIdPresenter } from '../../presentation/presenters/book/GetBookByIdPresenter';
import { Controller } from '../../protocol/Controller';
import { Presenter } from '../../protocol/Presenter';

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
      this.presenter.setOutput(serverError(error));
    }
  }
}

export namespace GetBookByIdController {
  export type Request = {
    bookId: string;
  };
}
