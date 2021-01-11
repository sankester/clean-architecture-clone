import { AddBookController } from '@adapter/controller';
import { AddBookPresenter } from '@adapter/presentation/presenters/book/AddBookPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbAddBook } from '../usecases/makeDbAddBook';
import { makeAddBookValidation } from '../validations/makeAddBookValidation';

export const makeAddBookHandler = (): Handler => {
  const presenter = new AddBookPresenter();
  const controller = new AddBookController(
    presenter,
    makeAddBookValidation(),
    makeDbAddBook()
  );

  return {
    controller,
    presenter,
  };
};
