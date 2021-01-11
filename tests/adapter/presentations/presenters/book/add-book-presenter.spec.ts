import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { AddBookPresenter } from '@adapter/presentation/presenter/book/AddBookPresenter';
import { Presenter } from '@adapter/protocol/Presenter';

const makeSubjectTest = (): Presenter => {
  return new AddBookPresenter();
};

describe('AddBookPresenter Test', () => {
  it('should response 201 with success message if this params is true', () => {
    const subject = makeSubjectTest();
    subject.transform(true);
    const expected = makeResponseFactory().created(
      makeBodyBuilder().setSuccess(AddBookPresenter.SuccessMessage).build()
    );
    expect(subject.getResponse()).toMatchObject(expected);
  });

  it('should response 200 with error message if this params is false', () => {
    const subject = makeSubjectTest();
    subject.transform(false);
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setError('transaction_error', AddBookPresenter.ErrorMessage)
        .build()
    );

    expect(subject.getResponse()).toMatchObject(expected);
  });
});
