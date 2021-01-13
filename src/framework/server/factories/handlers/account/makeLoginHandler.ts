import { LoginController } from '@adapter/controller/account/LoginController';
import { ValidateControllerProxy } from '@adapter/controller/proxy/ValidateControllerProxy';
import { LoginPresenter } from '@adapter/presentation/presenters/account/LoginPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbAuthentication } from '../../usecases/account/makeDBAuthentication';
import { makeLoginValidation } from '../../validations/account/makeLoginValidation';

export const makeLoginHandler = (): Handler => {
  const presenter = new LoginPresenter();
  const controller = new LoginController(presenter, makeDbAuthentication());
  const validateProxy = new ValidateControllerProxy(
    makeLoginValidation(),
    controller,
    presenter
  );
  return { controller: validateProxy, presenter };
};
