import { Presenter } from '../../../../../src/adapter/protocol/Presenter';
import { GetAllBookPresenter } from '../../../../../src/adapter/presentation/presenter/book/GetAllBookPresenter';
import { mockBookModel } from '../../../../entities/mock/mock-book';
import { makeResponseFactory } from '../../../../../src/adapter/presentation/helpers/makeResponseFactory';
import { makeBodyBuilder } from '../../../../../src/adapter/presentation/helpers/makeBodyBuiler';

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
});
