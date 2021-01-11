import { Presenter } from '../../../protocol/Presenter';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';

export class AddBookPresenter extends Presenter<AddBookPresenter.Data> {
  transform(data: AddBookPresenter.Data): void {
    const { created, ok } = makeResponseFactory();
    const response = data
      ? created(
          makeBodyBuilder().setSuccess(AddBookPresenter.SuccessMessage).build()
        )
      : ok(
          makeBodyBuilder()
            .setError('transaction_error', AddBookPresenter.ErrorMessage)
            .build()
        );
    this.setOutput(response);
  }
}

/* istanbul ignore next */
export namespace AddBookPresenter {
  export type Data = boolean;
  export const ErrorMessage = 'gagal menambah data buku';
  export const SuccessMessage = 'berhasil menambah data buku';
}
