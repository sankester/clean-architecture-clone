import { Listener } from './protocol/Listener';
import { Publisher } from './protocol/Publisher';

class EventDispatcher implements Publisher {
  private static _evetdispatcher: EventDispatcher;

  static getInstance(): EventDispatcher {
    if (!this._evetdispatcher) {
      this._evetdispatcher = new EventDispatcher();
    }
    return this._evetdispatcher;
  }

  private listeners: Record<string, Array<Listener>> = {};

  constructor() {
    this.listeners['*'] = [];
  }

  private initEventGroup(event = '*'): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
  }

  private getEventObservers(event = '*'): Listener[] {
    this.initEventGroup(event);
    const group = this.listeners[event];
    const all = this.listeners['*'];

    return Array.prototype.concat(group, all);
  }

  attach(listener: Listener, event: string): void {
    this.initEventGroup(event);
    this.listeners[event].push(listener);
  }

  detach(listener: Listener, event: string): void {
    const listeners = this.getEventObservers(event);
    const observerIndex = listeners.indexOf(listener);
    if (observerIndex) {
      this.listeners[event].splice(observerIndex, 1);
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
