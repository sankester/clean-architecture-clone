import { DeleteBookController } from '@adapter/controller/book/DeleteBookController';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { throwError } from '../../entities/mock/test-helper';
import { DeleteBookSpy, mockDeleteBookRequest } from '../mock/mock-book';
import { ValidationSpy } from '../mock/mock-validation';

type SubjectType = {
  subject: Controller;
  validationSpy: ValidationSpy;
  deleteBookSpy: DeleteBookSpy;
};

const makeSubjectTest = (): SubjectType => {
  const deleteBookSpy = new DeleteBookSpy();
  const validationSpy = new ValidationSpy();
  const subject = new DeleteBookController(validationSpy, deleteBookSpy);
  return {
    subject,
    validationSpy,
    deleteBookSpy,
  };
};

describe('Delete Book Controller Test', () => {
  it('should call validation with correct values', async () => {
    const { subject, validationSpy } = makeSubjectTest();
    const request = mockDeleteBookRequest();
    await subject.handle(request);
    expect(validationSpy.input).toMatchObject(request);
  });

  it('should return 400 if validation fails', async () => {
    const { subject, validationSpy } = makeSubjectTest();
    const request = mockDeleteBookRequest();
    validationSpy.error = new Error();
    const response = await subject.handle(request);
    expect(response).toMatchObject(
      makeResponseFactory().badRequest(validationSpy.error)
    );
  });

  it('should call deleteBook with correct params', async () => {
    const { subject, deleteBookSpy } = makeSubjectTest();
    const request = mockDeleteBookRequest();
    deleteBookSpy.bookId = request.bookId;
    await subject.handle(request);
    expect(deleteBookSpy.bookId).toBe(request.bookId);
  });

  it('should reutn 500 if deleteBook throw', async () => {
    const { subject, deleteBookSpy } = makeSubjectTest();
    jest.spyOn(deleteBookSpy, 'delete').mockImplementationOnce(throwError);
    const response = await subject.handle(mockDeleteBookRequest());
    expect(response).toEqual(makeResponseFactory().serverError(new Error()));
  });

  it('should return 200 if success ', async () => {
    const { subject, deleteBookSpy } = makeSubjectTest();
    const data = mockDeleteBookRequest();
    deleteBookSpy.bookId = data.bookId;
    const response = await subject.handle(data);
    const expectResponse = makeBodyBuilder()
      .setSuccess(DeleteBookController.SuccesMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });

  it('should return 200 transaction_error fail save data', async () => {
    const { subject, deleteBookSpy } = makeSubjectTest();
    deleteBookSpy.bookId = 'error';
    const response = await subject.handle(mockDeleteBookRequest());
    const expectResponse = makeBodyBuilder()
      .setError('transaction_error', DeleteBookController.ErrorMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });
});
