import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { GetAllBookPresenter } from '@adapter/presentation/presenter/book/GetAllBookPresenter';
import { Presenter } from '@adapter/protocol/Presenter';
import { mockBookModel } from '../../../../entities/mock/mock-book';

const makeSubjectTest = (): Presenter => new GetAllBookPresenter();

describe('GetAllBookPresenter Test', () => {
  it('should response 200 with list data of book', () => {
    const subject = makeSubjectTest();
    const list = [mockBookModel(), mockBookModel()];
    subject.transform(list);
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setData(list).build()
    );

    expect(subject.getResponse()).toMatchObject(expected);
  });

  it('should response 204 no content', () => {
    const subject = makeSubjectTest();
    subject.transform([]);
    expect(subject.getResponse()).toMatchObject(
      makeResponseFactory().noContent()
    );
  });

  it('should response 500 error when setOutput with serverError', () => {
    const subject = makeSubjectTest();
    const responseSet = makeResponseFactory().serverError(new Error());
    subject.setOutput(responseSet);
    const response = subject.getResponse();
    expect(response).toMatchObject(responseSet);
  });
});
