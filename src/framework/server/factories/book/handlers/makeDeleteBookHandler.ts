import { DeleteBookController } from '@adapter/controller';
import { DeleteBookPresenter } from '@adapter/presentation/presenter/book/DeleteBookPresenter';
import { makeDbDeleteBook } from '@framework/server/factories/book/usecases';
import { Handler } from '../../protocol/Handler';
import { makeDeleteBookValidation } from '../validations/makeDeleteBookValidation';

export const makeDeleteBookHandler = (): Handler => {
  const presenter = new DeleteBookPresenter();
  const controller = new DeleteBookController(
    presenter,
    makeDeleteBookValidation(),
    makeDbDeleteBook()
  );
  return { controller, presenter };
};
