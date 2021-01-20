import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { GetBookByIdPresenter } from '@adapter/presentation/presenters/book/GetBookByIdPresenter';
import { mockBookModel } from '../../../../entities/mock/mock-book';

const makeSubjectTest = () => new GetBookByIdPresenter();

describe('GetBookByIdPresenter Test', () => {
  it('should return 200 with book data', () => {
    const subject = makeSubjectTest();
    const data = mockBookModel();
    subject.transform(data);
    const response = subject.getResponse();
    const expected = makeResponseFactory().ok(
      makeBodyBuilder().setData(data).build()
    );
    expect(response).toMatchObject(expected);
  });

  it('should return 204 no content error', async () => {
    const subject = makeSubjectTest();
    subject.transform(null);
    const response = subject.getResponse();
    const expected = makeResponseFactory().noContent();
    expect(response).toMatchObject(expected);
  });

  it('should 500 server error', () => {
    const subject = makeSubjectTest();
    const serverError = makeResponseFactory().serverError(new Error());
    subject.setOutput(serverError);
    const response = subject.getResponse();
    expect(response).toMatchObject(serverError);
  });
});
