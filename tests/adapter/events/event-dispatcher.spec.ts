import EventDispatcher from '@adapter/events/EventDispatcher';
import { ListenerSpy } from '../mock/mock-listener';

const makeSubjectTest = () => EventDispatcher;

describe('Event Dispatcher Tests', () => {
  it('should attack listener', () => {
    const subject = makeSubjectTest();
    const listener = new ListenerSpy();
    subject.attach(listener, '*');
    const listeners = subject.listeners;
    expect(listeners['*'].includes(listener)).toBe(true);
  });

  it('should detach listener if exist', () => {
    const subject = makeSubjectTest();
    const listener = new ListenerSpy();
    const listeners = subject.listeners;

    subject.attach(listener, '*');
    expect(listeners['*'].includes(listener)).toBe(true);

    subject.detach(listener, '*');
    expect(listeners['*'].includes(listener)).toBe(false);
  });

  it('should publish with correct params', () => {
    const subject = makeSubjectTest();
    const listener = new ListenerSpy();
    subject.attach(listener, '*');
    subject.publish('*', {}, 'test');
    expect(listener.event).toBe('*');
    expect(listener.emitter).toMatchObject({});
    expect(listener.data).toBe('test');
  });
});
