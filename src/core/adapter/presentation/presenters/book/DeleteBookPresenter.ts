import { Presenter } from '../../../protocol/Presenter';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';

export class DeleteBookPresenter extends Presenter<DeleteBookPresenter.Data> {
  transform(data: boolean): void {
    const { ok } = makeResponseFactory();
    const body = makeBodyBuilder();
    if (data === true) {
      body.setSuccess(DeleteBookPresenter.SuccesMessage);
    } else {
      body.setError('transaction_error', DeleteBookPresenter.ErrorMessage);
    }
    this.setOutput(ok(body.build()));
  }
}

/* istanbul ignore next */
export namespace DeleteBookPresenter {
  export type Data = boolean;
  export const ErrorMessage = 'gagal menghapus buku';

  export const SuccesMessage = 'berhasil menghapus data buku';
}
