import { AddBookController } from '@adapter/controller';
import { AddBookPresenter } from '@adapter/presentation/presenters/book/AddBookPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbAddBook } from '../../usecases/book/makeDbAddBook';
import { makeAddBookValidation } from '../../validations/book/makeAddBookValidation';

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
