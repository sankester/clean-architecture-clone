import { Authentication } from '@entities/usecases/account/Authentication';
import { Presenter } from '../../../protocol/Presenter';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';

export class SignUpPresenter extends Presenter {
  transform(data: SignUpPresenter.Data): void {
    const body = makeBodyBuilder();
    if (data) {
      this.setOutput(
        makeResponseFactory().ok(
          body
            .setData({
              accessToken: data.accessToken,
              expiredAt: data.expiredAt,
            })
            .build()
        )
      );
    } else {
      this.setOutput(
        makeResponseFactory().ok(
          body
            .setError('transaction_error', SignUpPresenter.ErrorMessage)
            .build()
        )
      );
    }
  }
}

/* istanbul ignore next */
export namespace SignUpPresenter {
  export type Data = Authentication.Result;

  export const ErrorMessage = 'Error when authenticate';
}
