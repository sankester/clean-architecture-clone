import { GetAllBookController } from '@adapter/controller';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { throwError } from '../../entities/mock/test-helper';
import { GetAllBookSpy } from '../mock/mock-book';

type SubjectType = {
  subject: Controller;
  getAllBookSpy: GetAllBookSpy;
};

const makeSubjectTest = (): SubjectType => {
  const getAllBookSpy = new GetAllBookSpy();
  const subject = new GetAllBookController(getAllBookSpy);
  return {
    subject,
    getAllBookSpy,
  };
};

describe('Get All Book Controller Test', () => {
  it('should return 200 if success ', async () => {
    const { subject, getAllBookSpy } = makeSubjectTest();

    const response = await subject.handle({});
    const expectResponse = makeBodyBuilder()
      .setData(getAllBookSpy.data)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });

  it('should return 204 if empty data', async () => {
    const { subject, getAllBookSpy } = makeSubjectTest();
    getAllBookSpy.data = [];
    const response = await subject.handle({});
    expect(response).toEqual(makeResponseFactory().noContent());
  });

  it('should reutn 500 if findAll throw', async () => {
    const { subject, getAllBookSpy } = makeSubjectTest();
    jest.spyOn(getAllBookSpy, 'findAll').mockImplementationOnce(throwError);
    const response = await subject.handle({});
    expect(response).toEqual(makeResponseFactory().serverError(new Error()));
  });
});
