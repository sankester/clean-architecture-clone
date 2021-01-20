import { HttpBodyBuilder } from '@adapter/presentation/builder/HttpBodyBuilder';
import { HTTP_RESPONSE_ERROR } from '@adapter/presentation/constant/HttpResponseError';
import { HTTP_RESPONSE_SUCCESS } from '@adapter/presentation/constant/HttpResponseSuccess';
import { UnauthorizedError } from '@adapter/presentation/errors/UnauthorizedError';
import { HttpResponseFactory } from '@adapter/presentation/factories/HttpResponseFactory';
import { mockBookModel } from '../../../entities/mock/mock-book';
import { ResponseFactory } from '@adapter/presentation/protocol/ResponseFactory';
import { ResponseBodyBuilder } from '@adapter/presentation/protocol/ResponseBodyBuilder';
import { ResponseBody } from '@adapter/presentation/protocol/ResponseBody';

type SubjetcTest = {
  subject: ResponseFactory;
  bodyBuilder: ResponseBodyBuilder;
};

const makeSubjectTest = (): SubjetcTest => ({
  subject: new HttpResponseFactory(),
  bodyBuilder: new HttpBodyBuilder(),
});

describe('HttpMakeResponse Test', () => {
  it('should call badRequest with correct response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.badRequest(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
  });

  it('should call unauthorized with correct response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.unauthorized(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.UNAUTORIZED.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.UNAUTORIZED.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });

  it('should call unautorized with response Unauthorized error', () => {
    const { subject } = makeSubjectTest();
    const error = new UnauthorizedError();
    const response = subject.unauthorized();
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.UNAUTORIZED.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.UNAUTORIZED.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });

  it('should call forbidden with correct response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.forbidden(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.FORBIDDEN.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.FORBIDDEN.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });
  it('should call notFound with correct response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.notFound(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.NOT_FOUND.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.NOT_FOUND.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });

  it('should call conflict with coorrect response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.conflict(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.CONFLICT.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.CONFLICT.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });

  it('should call preconditionFailed with correct response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.preconditionFailed(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.PRECONDITION_FAILED.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.PRECONDITION_FAILED.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });

  it('should call unprocessEntity with correct response code & type', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    const response = subject.unprocessEntity(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.UNPROCESS_ENTITIY.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.UNPROCESS_ENTITIY.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(error.message);
  });

  it('should call serverError with correct response code & type and without error stact', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    delete error.stack;
    const response = subject.serverError(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.SERVER_ERROR.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.SERVER_ERROR.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(
      HTTP_RESPONSE_ERROR.SERVER_ERROR.DEFAULT_MESSAGE
    );
  });

  it('should call serverError with correct response stact from error stact', () => {
    const { subject } = makeSubjectTest();
    const error = new Error('error message');
    error.stack = 'error from stact';
    const response = subject.serverError(error);
    expect(response.code).toBe(HTTP_RESPONSE_ERROR.SERVER_ERROR.CODE);
    expect(response.type).toBe(HTTP_RESPONSE_ERROR.SERVER_ERROR.TYPE);
    expect(response.body).toBeInstanceOf(Error);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Error).message).toBe(
      HTTP_RESPONSE_ERROR.SERVER_ERROR.DEFAULT_MESSAGE
    );
    expect((response.body as Error).stack).toBe(error.stack);
  });

  it('should call ok with response with correct data body', () => {
    const { subject, bodyBuilder } = makeSubjectTest();

    const data = [mockBookModel()];
    const body = bodyBuilder.setData(data).build();
    const response = subject.ok(body);
    expect(response.code).toBe(HTTP_RESPONSE_SUCCESS.OK.CODE);
    expect(response.type).toBeUndefined();
    expect(response.body).toMatchObject(body);
    expect((response.body as ResponseBody).data).toBe(data);
  });

  it('should call ok with response with success body', () => {
    const { subject, bodyBuilder } = makeSubjectTest();

    const message = 'success transaction';
    const body = bodyBuilder.setSuccess(message).build();
    const response = subject.ok(body);

    expect(response.code).toBe(HTTP_RESPONSE_SUCCESS.OK.CODE);
    expect(response.type).toBeUndefined();
    expect(response.body).toMatchObject(body);
    expect((response.body as ResponseBody).success?.message).toEqual(message);
  });

  it('should call ok with response with error body', () => {
    const { subject, bodyBuilder } = makeSubjectTest();

    const message = 'success transaction';
    const errorType = 'transaction_error';
    const body = bodyBuilder.setError(errorType, message).build();
    const response = subject.ok(body);

    expect(response.code).toBe(HTTP_RESPONSE_SUCCESS.OK.CODE);
    expect(response.type).toBeUndefined();
    expect(response.body).toMatchObject(body);
    expect((response.body as ResponseBody).error?.type).toEqual(errorType);
    expect((response.body as ResponseBody).error?.message).toEqual(message);
  });

  it('should call created with correct response code & body', () => {
    const { subject, bodyBuilder } = makeSubjectTest();

    const data = mockBookModel();
    const body = bodyBuilder.setData(data).build();
    const response = subject.created(body);
    expect(response.code).toBe(HTTP_RESPONSE_SUCCESS.CREATED.CODE);
    expect(response.type).toBeUndefined();
    expect(response.body).toMatchObject(body);
    expect((response.body as ResponseBody).data).toBe(data);
  });

  it('should call noContent with correct response code & body', () => {
    const { subject } = makeSubjectTest();
    const response = subject.noContent();
    expect(response.code).toBe(HTTP_RESPONSE_SUCCESS.NO_CONTENT.CODE);
    expect(response.type).toBeUndefined();
    expect(response.body).toBeNull();
  });
});
