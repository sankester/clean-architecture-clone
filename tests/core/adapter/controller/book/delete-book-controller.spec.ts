import { DeleteBookController } from '@adapter/controller/book/DeleteBookController';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { DeleteBookPresenter } from '@adapter/presentation/presenters/book/DeleteBookPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { throwError } from '../../../entities/mock/test-helper';
import { DeleteBookSpy, mockDeleteBookRequest } from '../../mock/mock-book';

type SubjectType = {
  subject: Controller;
  presenter: Presenter;
  deleteBookSpy: DeleteBookSpy;
};

const makeSubjectTest = (): SubjectType => {
  const deleteBookSpy = new DeleteBookSpy();
  const presenter = new DeleteBookPresenter();
  const subject = new DeleteBookController(presenter, deleteBookSpy);
  return {
    subject,
    presenter,
    deleteBookSpy,
  };
};

describe('Delete Book Controller Test', () => {
  it('should call deleteBook with correct params', async () => {
    const { subject, deleteBookSpy } = makeSubjectTest();
    const request = mockDeleteBookRequest();
    deleteBookSpy.bookId = request.bookId;
    await subject.handle(request);
    expect(deleteBookSpy.bookId).toBe(request.bookId);
  });

  it('should reutn 500 if deleteBook throw', async () => {
    const { subject, presenter, deleteBookSpy } = makeSubjectTest();
    jest.spyOn(deleteBookSpy, 'delete').mockImplementationOnce(throwError);
    await subject.handle(mockDeleteBookRequest());
    const response = presenter.getResponse();
    expect(response).toEqual(makeResponseFactory().serverError(new Error()));
  });

  it('should return 200 if success ', async () => {
    const { subject, presenter, deleteBookSpy } = makeSubjectTest();
    const data = mockDeleteBookRequest();
    deleteBookSpy.bookId = data.bookId;
    await subject.handle(data);
    const response = presenter.getResponse();
    const expectResponse = makeBodyBuilder()
      .setSuccess(DeleteBookPresenter.SuccesMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });

  it('should return 200 transaction_error fail save data', async () => {
    const { subject, presenter, deleteBookSpy } = makeSubjectTest();
    deleteBookSpy.bookId = 'error';
    await subject.handle(mockDeleteBookRequest());
    const response = presenter.getResponse();
    const expectResponse = makeBodyBuilder()
      .setError('transaction_error', DeleteBookPresenter.ErrorMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });
});
