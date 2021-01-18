import { GetBookByIdController } from '@adapter/controller/book/GetBookByIdController';
import { ValidateControllerProxy } from '@adapter/controller/proxy/ValidateControllerProxy';
import { GetBookByIdPresenter } from '@adapter/presentation/presenters/book/GetBookByIdPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbGetBookById } from '../../usecases/book/makeDbGetBookById';
import { makeGetBookByIdValidation } from '../../validations/book/makeGetBookByIdValidation';

export const makeGetBookByIdHandler = (): Handler => {
  const presenter = new GetBookByIdPresenter();
  const controller = new GetBookByIdController(presenter, makeDbGetBookById());
  const validateProxy = new ValidateControllerProxy(
    makeGetBookByIdValidation(),
    controller,
    presenter
  );
  return { controller: validateProxy, presenter };
};
