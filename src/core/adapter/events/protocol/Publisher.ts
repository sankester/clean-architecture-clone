import { Listener } from './Listener';

export interface Publisher {
  attach(listener: Listener, event: string): void;
  detach(listener: Listener, event: string): void;
  publish(event: string, emitter: Record<string, any>, data: any): void;
}
