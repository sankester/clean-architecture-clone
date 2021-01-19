import { Listener } from '@adapter/events/protocol/Listener';

export class ListenerSpy implements Listener {
  event: string;
  emitter: Record<string, any>;
  data: any;
  handle(event: string, emitter: Record<string, any>, data: any): void {
    this.event = event;
    this.emitter = emitter;
    this.data = data;
  }
}
