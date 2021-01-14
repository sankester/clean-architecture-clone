import { LoginController } from '@adapter/controller/account/LoginController';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { LoginPresenter } from '@adapter/presentation/presenters/account/LoginPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import {
  AuthenticationSpy,
  mockLoginRequest,
} from '@tests/adapter/mock/mock-account';
import { throwError } from '../../../entities/mock/test-helper';

type SubjectType = {
  subject: Controller;
  presenter: Presenter;
  authenticationSpy: AuthenticationSpy;
};

const makeSubjectTest = (): SubjectType => {
  const presenter = new LoginPresenter();
  const authenticationSpy = new AuthenticationSpy();
  const subject = new LoginController(presenter, authenticationSpy);

  return { subject, presenter, authenticationSpy };
};

describe('Login Controller Test', () => {
  it('call authentication with correct params', async () => {
    const { subject, authenticationSpy } = makeSubjectTest();
    const data = mockLoginRequest();
    await subject.handle(data);
    expect(authenticationSpy.authParams).toMatchObject({
      email: data.email,
      password: data.password,
    });
  });

  it('should response token data if success authentication', async () => {
    const { subject, presenter, authenticationSpy } = makeSubjectTest();
    const data = mockLoginRequest();
    await subject.handle(data);
    const response = presenter.getResponse();
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setData({
          accessToken: authenticationSpy.result?.accessToken,
          expiredAt: authenticationSpy.result?.expiredAt,
        })
        .build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should response 200 with error message if failed authentication', async () => {
    const { subject, presenter, authenticationSpy } = makeSubjectTest();
    authenticationSpy.result = null;
    await subject.handle(mockLoginRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().unauthorized();
    expect(response).toMatchObject(expected);
  });

  it('should response 500 server error if authentication throws', async () => {
    const { subject, presenter, authenticationSpy } = makeSubjectTest();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
    await subject.handle(mockLoginRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });
});
