import { GetBookByIdController } from '@adapter/controller/book/GetBookByIdController';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { GetBookByIdPresenter } from '@adapter/presentation/presenters/book/GetBookByIdPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { makeBodyBuilder } from '../../../../src/adapter/presentation/helpers/makeBodyBuiler';
import { throwError } from '../../../entities/mock/test-helper';
import {
  GetBookByIdSpy,
  mockGetBookByIdBookRequest,
} from '../../mock/mock-book';

type SubjectTest = {
  subject: Controller;
  presenter: Presenter;
  getBookByIdSpy: GetBookByIdSpy;
};

const makeSubjectTest = (): SubjectTest => {
  const presenter = new GetBookByIdPresenter();
  const getBookByIdSpy = new GetBookByIdSpy();
  const subject = new GetBookByIdController(presenter, getBookByIdSpy);
  return { subject, presenter, getBookByIdSpy };
};

describe('Get Book By Id Controller Test', () => {
  it('should call getBookById with correct params', async () => {
    const { subject, getBookByIdSpy } = makeSubjectTest();
    const request = mockGetBookByIdBookRequest();
    await subject.handle(request);
    expect(getBookByIdSpy.id).toBe(request.bookId);
  });

  it('should response 500 error if getBookById throws', async () => {
    const { subject, getBookByIdSpy, presenter } = makeSubjectTest();
    jest.spyOn(getBookByIdSpy, 'getById').mockImplementationOnce(throwError);
    await subject.handle(mockGetBookByIdBookRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().serverError(new Error());
    expect(response).toMatchObject(expected);
  });

  it('should response 200 with book data if success', async () => {
    const { subject, presenter, getBookByIdSpy } = makeSubjectTest();
    await subject.handle(mockGetBookByIdBookRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setData(getBookByIdSpy.data).build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should response 204 noContent if return null', async () => {
    const { subject, presenter, getBookByIdSpy } = makeSubjectTest();
    getBookByIdSpy.data = null;
    await subject.handle(mockGetBookByIdBookRequest());
    const response = presenter.getResponse();
    const expected = makeResponseFactory().noContent();
    expect(response).toMatchObject(expected);
  });
});
