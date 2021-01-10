import { UpdateBookController } from '@adapter/controller/book/UpdateBookController';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { throwError } from '../../entities/mock/test-helper';
import { mockUpdateBookRequest, UpdateBookSpy } from '../mock/mock-book';
import { ValidationSpy } from '../mock/mock-validation';
import { Presenter } from '@adapter/protocol/Presenter';
import { UpdateBookPresenter } from '../../../src/adapter/presentation/presenter/book/UpdateBookPresenter';

type SubjectType = {
  subject: Controller;
  presenter: Presenter;
  validationSpy: ValidationSpy;
  updateBookSpy: UpdateBookSpy;
};

const makeSubjectTest = (): SubjectType => {
  const updateBookSpy = new UpdateBookSpy();
  const validationSpy = new ValidationSpy();
  const presenter = new UpdateBookPresenter();
  const subject = new UpdateBookController(
    presenter,
    validationSpy,
    updateBookSpy
  );
  return {
    subject,
    presenter,
    validationSpy,
    updateBookSpy,
  };
};

describe('Update Book Controller Test', () => {
  it('should call validation with correct values', async () => {
    const { subject, validationSpy } = makeSubjectTest();
    const request = mockUpdateBookRequest();
    await subject.handle(request);
    expect(validationSpy.input).toMatchObject(request);
  });

  it('should return 400 if validation fails', async () => {
    const { subject, presenter, validationSpy } = makeSubjectTest();
    const request = mockUpdateBookRequest();
    validationSpy.error = new Error();
    await subject.handle(request);
    const response = presenter.getResponse();
    expect(response).toMatchObject(
      makeResponseFactory().badRequest(validationSpy.error)
    );
  });

  it('should call updateBook with correct params', async () => {
    const { subject, updateBookSpy } = makeSubjectTest();
    const request = mockUpdateBookRequest();
    await subject.handle(request);
    updateBookSpy.bookId = request.bookId;
    expect(updateBookSpy.params).toMatchObject({
      title: request.title,
      author: request.author,
      issn: request.issn,
    });
  });

  it('should reutn 500 if updateBook throw', async () => {
    const { subject, presenter, updateBookSpy } = makeSubjectTest();
    jest.spyOn(updateBookSpy, 'update').mockImplementationOnce(throwError);
    await subject.handle(mockUpdateBookRequest());
    const response = presenter.getResponse();
    expect(response).toEqual(makeResponseFactory().serverError(new Error()));
  });

  it('should return 200 if success ', async () => {
    const { subject, presenter, updateBookSpy } = makeSubjectTest();
    const data = mockUpdateBookRequest();
    updateBookSpy.bookId = data.bookId;
    await subject.handle(data);
    const response = presenter.getResponse();
    const expectResponse = makeBodyBuilder()
      .setSuccess(UpdateBookPresenter.SuccessMessage)
      .setData({
        id: data.bookId,
        title: data.title,
        author: data.author,
        issn: data.issn,
      })
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });

  it('should return 200 transaction_error fail save data', async () => {
    const { subject, presenter, updateBookSpy } = makeSubjectTest();
    updateBookSpy.bookId = 'error';
    await subject.handle(mockUpdateBookRequest());
    const response = presenter.getResponse();
    const expectResponse = makeBodyBuilder()
      .setError('transaction_error', UpdateBookPresenter.ErrorMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });
});
