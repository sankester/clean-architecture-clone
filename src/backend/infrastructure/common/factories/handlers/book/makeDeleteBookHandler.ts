import { DeleteBookController } from '@adapter/controller/book';
import { ValidateControllerProxy } from '@adapter/controller/proxy/ValidateControllerProxy';
import { DeleteBookPresenter } from '@adapter/presentation/presenters/book/DeleteBookPresenter';
import { makeDbDeleteBook } from '@backend/infrastructure/common/factories/usecases/book/makeDbDeleteBook';
import { Handler } from '../../protocol/Handler';
import { makeDeleteBookValidation } from '../../validations/book/makeDeleteBookValidation';

export const makeDeleteBookHandler = (): Handler => {
  const presenter = new DeleteBookPresenter();
  const controller = new DeleteBookController(presenter, makeDbDeleteBook());
  const validateProxy = new ValidateControllerProxy(
    makeDeleteBookValidation(),
    controller,
    presenter
  );
  return { controller: validateProxy, presenter };
};
