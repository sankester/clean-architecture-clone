export interface Listener {
  handle(event: string, emitter: Record<string, any>, data: any): void;
}
