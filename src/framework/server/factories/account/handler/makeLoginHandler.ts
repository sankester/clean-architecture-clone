import { LoginController } from '@adapter/controller/account/LoginController';
import { LoginPresenter } from '@adapter/presentation/presenters/account/LoginPresenter';
import { makeLoginValidation } from '../validation/makeLoginValidation';
import { Handler } from '../../protocol/Handler';
import { makeDbAuthentication } from '../usecases/makeDBAuthentication';

export const makeLoginHandler = (): Handler => {
  const presenter = new LoginPresenter();
  const controller = new LoginController(
    presenter,
    makeLoginValidation(),
    makeDbAuthentication()
  );
  return { controller, presenter };
};
