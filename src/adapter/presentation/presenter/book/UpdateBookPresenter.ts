import { Book } from '@entities/models/Book';
import { Presenter } from '../../../protocol/Presenter';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';

export class UpdateBookPresenter extends Presenter<UpdateBookPresenter.Data> {
  transform(data: UpdateBookPresenter.Data): void {
    const { ok } = makeResponseFactory();
    let body = makeBodyBuilder();
    if (data) {
      body = makeBodyBuilder()
        .setData(data)
        .setSuccess(UpdateBookPresenter.SuccessMessage);
    } else {
      body = makeBodyBuilder().setError(
        'transaction_error',
        UpdateBookPresenter.ErrorMessage
      );
    }
    this.setOutput(ok(body.build()));
  }
}

/* istanbul ignore next */
export namespace UpdateBookPresenter {
  export type Data = Book | null;

  export const ErrorMessage = 'gagal merubah data buku';

  export const SuccessMessage = 'berhasil merubah data buku';
}
