import { Listener } from './protocol/Listener';
import { Publisher } from './protocol/Publisher';

class EventDispatcher implements Publisher {
  private static _evetdispatcher: EventDispatcher;

  /* istanbul ignore next */ static getInstance(): EventDispatcher {
    if (!this._evetdispatcher) {
      this._evetdispatcher = new EventDispatcher();
    }
    return this._evetdispatcher;
  }

  private _listeners: Record<string, Array<Listener>> = {};

  constructor() {
    this._listeners['*'] = [];
  }

  public get listeners(): Record<string, Array<Listener>> {
    return this._listeners;
  }

  /* istanbul ignore next */ private initEventGroup(event = '*'): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
  }

  /* istanbul ignore next */ private getEventObservers(
    event = '*'
  ): Listener[] {
    this.initEventGroup(event);
    const group = this._listeners[event];
    const all = this._listeners['*'];

    return Array.prototype.concat(group, all);
  }

  attach(listener: Listener, event: string): void {
    this.initEventGroup(event);
    this._listeners[event].push(listener);
  }

  detach(listener: Listener, event: string): void {
    const listeners = this.getEventObservers(event);
    const observerIndex = listeners.indexOf(listener);

    /* istanbul ignore next */
    if (observerIndex > 0) {
      this._listeners[event].splice(observerIndex, 1);
    }
  }

  publish(event: string, emitter: Record<string, any>, data: any): void {
    const listeners = this.getEventObservers(event);
    for (const listener of listeners) {
      listener.handle(event, emitter, data);
    }
  }
}

export default EventDispatcher.getInstance();
