import { ValidateControllerProxy } from '@adapter/controller/proxy/ValidateControllerProxy';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { ControllerSpy, PresenterSpy } from '@tests/core/adapter/mock/mock-adapter';
import { throwError } from '../../../entities/mock/test-helper';
import { ValidationSpy } from '../../mock/mock-validation';

type SubjectTest = {
  subject: ValidateControllerProxy;
  controllerSpy: ControllerSpy;
  presenterSpy: PresenterSpy;
  validationSpy: ValidationSpy;
};

const makeSubjectTests = (): SubjectTest => {
  const presenterSpy = new PresenterSpy();
  const validationSpy = new ValidationSpy();
  const controllerSpy = new ControllerSpy();
  const subject = new ValidateControllerProxy(
    validationSpy,
    controllerSpy,
    presenterSpy
  );
  return { subject, controllerSpy, presenterSpy, validationSpy };
};

describe('ValidateControllerProxy Test', () => {
  it('should response 400 error if invalid requests', async () => {
    const { subject, validationSpy, presenterSpy } = makeSubjectTests();
    validationSpy.error = new Error();
    await subject.handle({ name: 'vani ard' });
    const response = presenterSpy.getResponse();
    const expected = makeResponseFactory().badRequest(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should response 500 error id validate throws', async () => {
    const { subject, validationSpy, presenterSpy } = makeSubjectTests();
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    await subject.handle({});
    const response = presenterSpy.getResponse();
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should call handle in controller with valid params', async () => {
    const { subject, controllerSpy } = makeSubjectTests();
    const request = { name: 'vani ard' };
    await subject.handle(request);
    expect(controllerSpy.request).toMatchObject(request);
  });
});
