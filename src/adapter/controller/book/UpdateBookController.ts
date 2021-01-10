import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { Validation } from '@adapter/protocol/Validation';
import { UpdateBook } from '@entities/usecases/book/UpdateBook';
import { UpdateBookPresenter } from '../../presentation/presenter/book/UpdateBookPresenter';
import { Presenter } from '../../protocol/Presenter';

export class UpdateBookController implements Controller {
  constructor(
    private readonly presenter: Presenter<UpdateBookPresenter.Data>,
    private readonly validation: Validation,
    private readonly updateBook: UpdateBook
  ) {}

  async handle(request: UpdateBookController.Request): Promise<void> {
    const { serverError, badRequest } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        this.presenter.setOutput(badRequest(error));
      } else {
        const { bookId } = request;
        const params: UpdateBook.Params = {
          title: request.title,
          author: request.author,
          issn: request.issn,
        };
        const updated = await this.updateBook.update(bookId, params);
        this.presenter.transform(updated);
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}

/* istanbul ignore next */
export namespace UpdateBookController {
  export type Request = UpdateBook.Params & { bookId: string };
}
