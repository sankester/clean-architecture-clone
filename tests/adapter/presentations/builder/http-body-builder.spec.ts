import { HttpBodyBuilder } from '@adapter/presentation/builder/HttpBodyBuilder';
import { ResponseBodyBuilder } from '@adapter/presentation/protocol/ResponseBodyBuilder';
import faker from 'faker';

type SubjectTest = {
  subject: ResponseBodyBuilder;
};

const makeSubjectTest = (): SubjectTest => ({
  subject: new HttpBodyBuilder(),
});

const mockData = () => ({
  title: faker.lorem.words(),
  author: faker.name.firstName(),
});

describe('Http Body Bulder Test', () => {
  it('should call build with have returned and with object with default value', () => {
    const { subject } = makeSubjectTest();
    expect(subject.build()).toMatchObject({});
  });

  it('should make body with only data & correct value', () => {
    const { subject } = makeSubjectTest();
    const data = mockData();
    const body = subject.setData(data).build();

    expect(body).toHaveProperty('data');
    expect(body).not.toHaveProperty('success');
    expect(body).not.toHaveProperty('error');
    expect(body.data).toMatchObject(data);
  });

  it('should make body with data only success & correct value', () => {
    const { subject } = makeSubjectTest();
    const message = 'success message';
    const body = subject.setSuccess(message).build();

    expect(body).not.toHaveProperty('data');
    expect(body).toHaveProperty('success');
    expect(body).not.toHaveProperty('error');
    expect(body.success).toHaveProperty('message');
    expect(body.success?.message).toEqual(message);
  });

  it('should make body with only error & correct value', () => {
    const { subject } = makeSubjectTest();
    const message = 'error message';
    const type = 'transaction_error';
    const body = subject.setError(type, message).build();

    expect(body).not.toHaveProperty('data');
    expect(body).not.toHaveProperty('success');
    expect(body).toHaveProperty('error');
    expect(body.error).toHaveProperty('type');
    expect(body.error).toHaveProperty('message');
    expect(body.error?.type).toEqual(type);
    expect(body.error?.message).toEqual(message);
  });

  it('shoult make body with composite value', () => {
    const { subject } = makeSubjectTest();
    const data = mockData();
    const message = 'success message';
    const body = subject.setSuccess(message).setData(data).build();

    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('success');
    expect(body).not.toHaveProperty('error');
    expect(body.data).toMatchObject(data);
    expect(body.success?.message).toBe(message);
  });
});
