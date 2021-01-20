import { AuthMiddleware } from '@adapter/middleware/AuthMiddleware';
import { AccessDeniedError } from '@adapter/presentation/errors/AccessDeniedError';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Middleware } from '@adapter/protocol/Middleware';
import faker from 'faker';
import { DecrypterSpy } from '../../application/mock/mock-cryptograpy';
import { throwError } from '../../entities/mock/test-helper';

type SubjectTest = {
  subject: Middleware;
  decrypterSpy: DecrypterSpy;
};

const makeSubjectTest = (): SubjectTest => {
  const decrypterSpy = new DecrypterSpy();
  const subject = new AuthMiddleware(decrypterSpy);

  return { subject, decrypterSpy };
};

const mockMiddlewareRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.random.uuid(),
});

describe('AuthMiddleware Test', () => {
  it('should return 403 forbidden access when access token not found', async () => {
    const { subject } = makeSubjectTest();
    const response = await subject.handle({});
    const expected = makeResponseFactory().forbidden(new AccessDeniedError());
    expect(response).toMatchObject(expected);
  });

  it('should call descrypter with correct params', async () => {
    const { subject, decrypterSpy } = makeSubjectTest();
    const request = mockMiddlewareRequest();
    await subject.handle(request);
    expect(decrypterSpy.ciphertext).toBe(request.accessToken);
  });

  it('should return 403 forbidden access when decrypter failed', async () => {
    const { subject, decrypterSpy } = makeSubjectTest();
    decrypterSpy.plaintext = '';
    const response = await subject.handle({});
    const expected = makeResponseFactory().forbidden(new AccessDeniedError());
    expect(response).toMatchObject(expected);
  });

  it('should throw and return 500 internal server error decrypt throws', async () => {
    const { subject, decrypterSpy } = makeSubjectTest();
    jest.spyOn(decrypterSpy, 'descypt').mockImplementationOnce(throwError);
    const response = await subject.handle(mockMiddlewareRequest());
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should return 200 success and return string decrypt', async () => {
    const { subject, decrypterSpy } = makeSubjectTest();
    const response = await subject.handle(mockMiddlewareRequest());
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setData(decrypterSpy.plaintext).build()
    );
    expect(response).toMatchObject(expected);
  });
});
