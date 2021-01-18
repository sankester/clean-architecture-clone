import { GetBookById } from './../../../../entities/usecases/book/GetBookById';
import { Presenter } from '../../../protocol/Presenter';
import { makeBodyBuilder } from '../../helpers/makeBodyBuiler';
import { makeResponseFactory } from '../../helpers/makeResponseFactory';

export class GetBookByIdPresenter extends Presenter {
  transform(data: GetBookByIdPresenter.Data): void {
    if (data) {
      this.setOutput(
        makeResponseFactory().ok(makeBodyBuilder().setData(data).build())
      );
    } else {
      this.setOutput(makeResponseFactory().noContent());
    }
  }
}

export namespace GetBookByIdPresenter {
  export type Data = GetBookById.Result;
}
