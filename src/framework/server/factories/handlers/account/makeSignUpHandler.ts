import { SingupController } from '@adapter/controller/account/SignUpController';
import { ValidateControllerProxy } from '@adapter/controller/proxy/ValidateControllerProxy';
import { SignUpPresenter } from '@adapter/presentation/presenters/account/SignUpPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbAddAccount } from '../../usecases/account/makeDbAddAccount';
import { makeDbAuthentication } from '../../usecases/account/makeDbAuthentication';
import { makeSignUpValidation } from '../../validations/account/makeSignUpValidation';

export const makeSignUptHandler = (): Handler => {
  const presenter = new SignUpPresenter();

  const controller = new SingupController(
    presenter,
    makeDbAddAccount(),
    makeDbAuthentication()
  );

  const validateProxy = new ValidateControllerProxy(
    makeSignUpValidation(),
    controller,
    presenter
  );

  return { controller: validateProxy, presenter };
};
