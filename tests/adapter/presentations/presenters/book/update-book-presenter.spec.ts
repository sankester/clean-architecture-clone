import { Presenter } from '@adapter/protocol/Presenter';
import { UpdateBookPresenter } from '@adapter/presentation/presenter/book/UpdateBookPresenter';
import { mockBookModel } from '../../../../entities/mock/mock-book';
import { makeResponseFactory } from '../../../../../src/adapter/presentation/helpers/makeResponseFactory';
import { makeBodyBuilder } from '../../../../../src/adapter/presentation/helpers/makeBodyBuiler';

const makeSubjectTest = (): Presenter => new UpdateBookPresenter();

describe('UpdateBookPresenter Tests', () => {
  it('should response 200 with book data if this params is book object', () => {
    const subject = makeSubjectTest();
    const data = mockBookModel();
    subject.transform(data);
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setData(data)
        .setSuccess(UpdateBookPresenter.SuccessMessage)
        .build()
    );

    expect(subject.getResponse()).toMatchObject(expected);
  });

  it('should response 200 with error message if this params is null', () => {
    const subject = makeSubjectTest();
    subject.transform(null);
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setError('transaction_error', UpdateBookPresenter.ErrorMessage)
        .build()
    );

    expect(subject.getResponse()).toMatchObject(expected);
  });
});
