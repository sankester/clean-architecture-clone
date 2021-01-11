import { Authentication } from '@entities/usecases/account/Authentication';
import { Presenter } from '../../../protocol/Presenter';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';

export class LoginPresenter extends Presenter {
  transform(data: LoginPresenter.Data): void {
    const body = makeBodyBuilder();
    if (data) {
      this.setOutput(makeResponseFactory().ok(body.setData(data).build()));
    } else {
      this.setOutput(makeResponseFactory().unauthorized());
    }
  }
}

/* istanbul ignore next */
export namespace LoginPresenter {
  export type Data = Authentication.Result;

  export const ErrorMessage = 'Error when authenticate';
}
