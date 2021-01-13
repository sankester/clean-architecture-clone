import { SingupController } from '@adapter/controller/account/SignUpController';
import { EmailInUseError } from '@adapter/presentation/errors/EmailInUseError';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { SignUpPresenter } from '@adapter/presentation/presenters/account/SignUpPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import {
  AddAccountSpy,
  mockSignupRequest,
} from '@tests/adapter/mock/mock-account';
import { throwError } from '../../../entities/mock/test-helper';
import { AuthenticationSpy } from '../../mock/mock-account';

type SubjectType = {
  subject: Controller;
  presenter: Presenter;
  addAccountSpy: AddAccountSpy;
  authenticationSpy: AuthenticationSpy;
};

const makeSubjectTest = (): SubjectType => {
  const presenter = new SignUpPresenter();
  const addAccountSpy = new AddAccountSpy();
  const authenticationSpy = new AuthenticationSpy();
  const subject = new SingupController(
    presenter,
    addAccountSpy,
    authenticationSpy
  );

  return {
    subject,
    presenter,
    addAccountSpy,
    authenticationSpy,
  };
};

describe('Sign Up Controller Test', () => {
  it('should call addAccount with correct params ', async () => {
    const { subject, addAccountSpy } = makeSubjectTest();
    const params = mockSignupRequest();
    await subject.handle(params);
    expect(addAccountSpy.params).toMatchObject(params);
  });

  it('should response 403 fobinddes when failed save account', async () => {
    const { subject, presenter, addAccountSpy } = makeSubjectTest();
    addAccountSpy.result = false;
    await subject.handle(mockSignupRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().forbidden(new EmailInUseError());
    expect(response).toMatchObject(expected);
  });

  it('should response 500 server error if addAccount throws', async () => {
    const { subject, presenter, addAccountSpy } = makeSubjectTest();
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError);
    await subject.handle(mockSignupRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('call authentication with correct params', async () => {
    const { subject, authenticationSpy } = makeSubjectTest();
    const data = mockSignupRequest();
    await subject.handle(data);
    expect(authenticationSpy.authParams).toMatchObject({
      email: data.email,
      password: data.password,
    });
  });

  it('should response token data if success authentication', async () => {
    const { subject, presenter, authenticationSpy } = makeSubjectTest();
    const data = mockSignupRequest();
    await subject.handle(data);
    const response = presenter.getResponse();
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setData(authenticationSpy.result).build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should response 200 with error message if failed authentication', async () => {
    const { subject, presenter, authenticationSpy } = makeSubjectTest();
    authenticationSpy.result = null;
    await subject.handle(mockSignupRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setError('transaction_error', SignUpPresenter.ErrorMessage)
        .build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should response 500 server error if authentication throws', async () => {
    const { subject, presenter, authenticationSpy } = makeSubjectTest();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
    await subject.handle(mockSignupRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });
});
