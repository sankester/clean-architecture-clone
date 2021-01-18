import { AuthMiddlewaCacheProxy } from '@adapter/middleware/proxy/AuthMiddlewareCacheProxy';
import { AccessDeniedError } from '@adapter/presentation/errors/AccessDeniedError';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import faker from 'faker';
import {
  CacheDiverSetSpy,
  CacheDriverGetSpy,
  mockAuthCache,
} from '../../../application/mock/mock-cache-driver';
import { throwError } from '../../../entities/mock/test-helper';
import { AuthMiddlewareSpy } from '../../mock/mock-adapter';

type SubjectTest = {
  subject: AuthMiddlewaCacheProxy;
  authMiddlewareSpy: AuthMiddlewareSpy;
  cacheDriverSetSpy: CacheDiverSetSpy;
  cacheDriverGetSpy: CacheDriverGetSpy;
};

const makeSubjectTest = (): SubjectTest => {
  const authMiddlewareSpy = new AuthMiddlewareSpy();
  const cacheDriverSetSpy = new CacheDiverSetSpy();
  const cacheDriverGetSpy = new CacheDriverGetSpy();
  cacheDriverGetSpy.value = mockAuthCache();
  const subject = new AuthMiddlewaCacheProxy(
    authMiddlewareSpy,
    cacheDriverSetSpy,
    cacheDriverGetSpy
  );
  return {
    subject,
    authMiddlewareSpy,
    cacheDriverSetSpy,
    cacheDriverGetSpy,
  };
};

const mockAuthMiddlewareRequest = () => ({ accessToken: faker.random.uuid() });

describe('Auth Middleware Cache Proxy Tests', () => {
  it('should return forbidden access if token undefined', async () => {
    const { subject } = makeSubjectTest();
    const response = await subject.handle({} as any);
    const expected = makeResponseFactory().forbidden(new AccessDeniedError());
    expect(response).toMatchObject(expected);
  });

  it('should call cacheDriverGet with correct value', async () => {
    const { subject, cacheDriverGetSpy } = makeSubjectTest();
    const param = mockAuthMiddlewareRequest();
    await subject.handle(param);
    expect(cacheDriverGetSpy.key).toBe(param.accessToken);
  });

  it('should return server error if cacheDriverGet throws', async () => {
    const { subject, cacheDriverGetSpy } = makeSubjectTest();
    jest.spyOn(cacheDriverGetSpy, 'get').mockImplementationOnce(throwError);
    const response = await subject.handle(mockAuthMiddlewareRequest());
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should response 200 with data from cache if token exist', async () => {
    const { subject, cacheDriverGetSpy } = makeSubjectTest();
    const response = await subject.handle(mockAuthMiddlewareRequest());
    const expected = makeResponseFactory().ok(
      makeBodyBuilder()
        .setData(JSON.parse(cacheDriverGetSpy.value as string))
        .build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should call middleware handle with correct params if token access exist', async () => {
    const { subject, authMiddlewareSpy, cacheDriverGetSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    const param = mockAuthMiddlewareRequest();
    await subject.handle(param);
    expect(authMiddlewareSpy.httpRequest).toMatchObject(param);
  });

  it('should return 403 forbidden access when middleware handle response fail', async () => {
    const { subject, authMiddlewareSpy, cacheDriverGetSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    authMiddlewareSpy.response = makeResponseFactory().serverError(new Error());
    const response = await subject.handle(mockAuthMiddlewareRequest());
    const expected = makeResponseFactory().forbidden(new AccessDeniedError());
    expect(response).toMatchObject(expected);
  });

  it('should return server error if middleware throws', async () => {
    const { subject, cacheDriverGetSpy, authMiddlewareSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    jest.spyOn(authMiddlewareSpy, 'handle').mockImplementationOnce(throwError);
    const response = await subject.handle(mockAuthMiddlewareRequest());
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should call cacheDriverSet with correct value', async () => {
    const {
      subject,
      authMiddlewareSpy,
      cacheDriverGetSpy,
      cacheDriverSetSpy,
    } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    const param = mockAuthMiddlewareRequest();
    await subject.handle(param);
    const dataBody: any = authMiddlewareSpy.response.body;
    const expireAfter =
      dataBody.data.exp - Math.round(new Date().valueOf() / 1000);
    expect(cacheDriverSetSpy.key).toBe(param.accessToken);
    expect(cacheDriverSetSpy.value).toBe(
      JSON.stringify({ id: dataBody.data.id })
    );
    expect(cacheDriverSetSpy.expireAfter).toBe(expireAfter);
  });

  it('should return server error if cacheDriverSet throws', async () => {
    const { subject, cacheDriverGetSpy, cacheDriverSetSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    jest.spyOn(cacheDriverSetSpy, 'set').mockImplementationOnce(throwError);
    const response = await subject.handle(mockAuthMiddlewareRequest());
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should return response 200 with data from middleware ', async () => {
    const { subject, authMiddlewareSpy, cacheDriverGetSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    const response = await subject.handle(mockAuthMiddlewareRequest());
    expect(response).toMatchObject(authMiddlewareSpy.response);
  });
});
