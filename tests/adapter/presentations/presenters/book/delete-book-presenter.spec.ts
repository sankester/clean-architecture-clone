import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { DeleteBookPresenter } from '@adapter/presentation/presenter/book/DeleteBookPresenter';
import { Presenter } from '@adapter/protocol/Presenter';

const makeSubjectTest = (): Presenter => new DeleteBookPresenter();

describe('DeleteBookPresenter Test ', () => {
  it('should response 200 with success message if this params is true', () => {
    const subject = makeSubjectTest();
    subject.transform(true);
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setSuccess(DeleteBookPresenter.SuccesMessage).build()
    );
    expect(subject.getResponse()).toMatchObject(expected);
  });

  it('should response 200 with error message if this params is false', () => {
    const subject = makeSubjectTest();
    subject.transform(false);
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setError('transaction_error', DeleteBookPresenter.ErrorMessage)
        .build()
    );

    expect(subject.getResponse()).toMatchObject(expected);
  });
});
