import { SingupController } from '@adapter/controller/account/SignUpController';
import { SignUpPresenter } from '@adapter/presentation/presenter/account/SignUpPresenter';
import { Handler } from '../../protocol/Handler';
import { makeDbAddAccount } from '../usecases/makeDbAddAccount';
import { makeDbAuthentication } from '../usecases/makeDBAuthentication';
import { makeSignUpValidation } from '../validation/makeSignUpValidation';

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
