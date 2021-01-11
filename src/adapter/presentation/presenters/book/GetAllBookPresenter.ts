import { Presenter } from '../../../protocol/Presenter';
import { Book } from '@entities/models/Book';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';

export class GetAllBookPresenter extends Presenter<GetAllBookPresenter.Data> {
  transform(data: GetAllBookPresenter.Data): void {
    const { ok, noContent } = makeResponseFactory();

    if (data.length > 0) {
      this.setOutput(ok(makeBodyBuilder().setData(data).build()));
    } else {
      this.setOutput(noContent());
    }
  }
}

/* istanbul ignore next */
export namespace GetAllBookPresenter {
  export type Data = Book[];
}
