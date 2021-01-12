import { DeleteBookController } from '@adapter/controller';
import { DeleteBookPresenter } from '@adapter/presentation/presenters/book/DeleteBookPresenter';
import { makeDbDeleteBook } from '@framework/server/factories/usecases/book/makeDbDeleteBook';
import { Handler } from '../../protocol/Handler';
import { makeDeleteBookValidation } from '../../validations/book/makeDeleteBookValidation';

export const makeDeleteBookHandler = (): Handler => {
  const presenter = new DeleteBookPresenter();
  const controller = new DeleteBookController(
    presenter,
    makeDeleteBookValidation(),
    makeDbDeleteBook()
  );
  return { controller, presenter };
};
