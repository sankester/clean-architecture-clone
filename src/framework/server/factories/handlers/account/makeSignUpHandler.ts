import { SingupController } from '@adapter/controller/account/SignUpController';
import { SignUpPresenter } from '@adapter/presentation/presenters/account/SignUpPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbAddAccount } from '../../usecases/account/makeDbAddAccount';
import { makeDbAuthentication } from '../../usecases/account/makeDBAuthentication';
import { makeSignUpValidation } from '../../validations/account/makeSignUpValidation';

export const makeSignUptHandler = (): Handler => {
  const presenter = new SignUpPresenter();

  const controller = new SingupController(
    presenter,
    makeSignUpValidation(),
    makeDbAddAccount(),
    makeDbAuthentication()
  );

  return { controller, presenter };
};
