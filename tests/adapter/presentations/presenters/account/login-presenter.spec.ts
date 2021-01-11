import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Presenter } from '@adapter/protocol/Presenter';
import { LoginPresenter } from '@adapter/presentation/presenter/account/LoginPresenter';
import { mockAuthenticationPresenter } from '../mocks/mock-account-presenter';

const makeSubjectTest = (): Presenter => new LoginPresenter();

describe('Sign Up Presenter Test', () => {
  it('should response 200 with token data ', () => {
    const subject = makeSubjectTest();

    const data = mockAuthenticationPresenter();
    subject.transform(data);
    const response = subject.getResponse();
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setData(data).build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should response 401 with unautorized if this params is null', () => {
    const subject = makeSubjectTest();
    subject.transform(null);
    const expected = makeResponseFactory().unauthorized();

    expect(subject.getResponse()).toMatchObject(expected);
  });

  it('should response 500 error when setOutput with serverError', () => {
    const subject = makeSubjectTest();
    const responseSet = makeResponseFactory().serverError(new Error());
    subject.setOutput(responseSet);
    const response = subject.getResponse();
    expect(response).toMatchObject(responseSet);
  });
});
