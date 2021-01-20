import { GetAllBookController } from '@adapter/controller';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { GetAllBookPresenter } from '@adapter/presentation/presenters/book/GetAllBookPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { throwError } from '../../../entities/mock/test-helper';
import { GetAllBookSpy } from '../../mock/mock-book';

type SubjectType = {
  subject: Controller;
  presenter: Presenter;
  getAllBookSpy: GetAllBookSpy;
};

const makeSubjectTest = (): SubjectType => {
  const getAllBookSpy = new GetAllBookSpy();
  const presenter = new GetAllBookPresenter();
  const subject = new GetAllBookController(presenter, getAllBookSpy);
  return {
    subject,
    presenter,
    getAllBookSpy,
  };
};

describe('Get All Book Controller Test', () => {
  it('should return 200 if success ', async () => {
    const { subject, presenter, getAllBookSpy } = makeSubjectTest();
    await subject.handle({});
    const response = presenter.getResponse();
    const expectResponse = makeBodyBuilder()
      .setData(getAllBookSpy.data)
      .build();
    expect(response).toEqual(makeResponseFactory().ok(expectResponse));
  });

  it('should return 204 if empty data', async () => {
    const { subject, presenter, getAllBookSpy } = makeSubjectTest();
    getAllBookSpy.data = [];
    await subject.handle({});
    const response = presenter.getResponse();
    expect(response).toEqual(makeResponseFactory().noContent());
  });

  it('should reutn 500 if findAll throw', async () => {
    const { subject, presenter, getAllBookSpy } = makeSubjectTest();
    jest.spyOn(getAllBookSpy, 'findAll').mockImplementationOnce(throwError);
    await subject.handle({});
    const response = presenter.getResponse();
    expect(response).toEqual(makeResponseFactory().serverError(new Error()));
  });
});
