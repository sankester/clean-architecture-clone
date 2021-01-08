import { AddBookController } from '@adapter/controller/book/AddBookController';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { mockAddBookParams } from '../../entities/mock/mock-book';
import { throwError } from '../../entities/mock/test-helper';
import { AddBookSpy, mockAddBookRequest } from '../mock/mock-book';
import { ValidationSpy } from '../mock/mock-validation';

type SubjectType = {
  subject: Controller;
  validationSpy: ValidationSpy;
  addBookSpy: AddBookSpy;
};

const makeSubjectTest = (): SubjectType => {
  const addBookSpy = new AddBookSpy();
  const validationSpy = new ValidationSpy();
  const subject = new AddBookController(validationSpy, addBookSpy);
  return {
    subject,
    validationSpy,
    addBookSpy,
  };
};

describe('Add Book Controller Test', () => {
  it('should call validation with correct values', async () => {
    const { subject, validationSpy } = makeSubjectTest();
    const request = mockAddBookRequest();
    await subject.handle(request);
    expect(validationSpy.input).toMatchObject(request);
  });

  it('should return 400 if validation fails', async () => {
    const { subject, validationSpy } = makeSubjectTest();
    const request = mockAddBookRequest();
    validationSpy.error = new Error();
    const response = await subject.handle(request);
    expect(response).toMatchObject(
      makeResponseFactory().badRequest(validationSpy.error)
    );
  });

  it('should call addBook with correct params', async () => {
    const { subject, addBookSpy } = makeSubjectTest();
    const request = mockAddBookParams();
    await subject.handle(request);
    expect(addBookSpy.params).toMatchObject(request);
  });

  it('should reutn 500 if addBook throw', async () => {
    const { subject, addBookSpy } = makeSubjectTest();
    jest.spyOn(addBookSpy, 'add').mockImplementationOnce(throwError);
    const response = await subject.handle(mockAddBookRequest());
    expect(response).toEqual(makeResponseFactory().serverError(new Error()));
  });

  it('should return 201 if success ', async () => {
    const { subject } = makeSubjectTest();
    const response = await subject.handle(mockAddBookRequest());
    const expectResponse = makeBodyBuilder()
      .setSuccess(AddBookController.SuccessMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().created(expectResponse));
  });

  it('should return 200 transaction_error fail save data', async () => {
    const { subject, addBookSpy } = makeSubjectTest();
    addBookSpy.return = false;
    const response = await subject.handle(mockAddBookRequest());
    const expectResponse = makeBodyBuilder()
      .setError('transaction_error', AddBookController.ErrorMessage)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });
});
