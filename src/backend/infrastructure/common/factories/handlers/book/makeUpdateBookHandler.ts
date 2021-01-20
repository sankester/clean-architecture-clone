import { UpdateBookController } from '@adapter/controller/book/UpdateBookController';
import { UpdateBookPresenter } from '@adapter/presentation/presenters/book/UpdateBookPresenter';
import { Handler } from '../../protocol/Handler';
import { makeUpdateBookValidation } from '../../validations/book/makeUpdateBookValidation';
import { makeDbUpdateBook } from '../../usecases/book/makeDbUpdateBook';
import { ValidateControllerProxy } from '@adapter/controller/proxy/ValidateControllerProxy';

export const makeUpdateBookHandler = (): Handler => {
  const presenter = new UpdateBookPresenter();
  const controller = new UpdateBookController(presenter, makeDbUpdateBook());
  const validateProxy = new ValidateControllerProxy(
    makeUpdateBookValidation(),
    controller,
    presenter
  );
  return { controller: validateProxy, presenter };
};
