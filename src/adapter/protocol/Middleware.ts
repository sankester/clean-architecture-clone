import { Response } from '@adapter/presentation/protocol/Response';

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<Response>;
}
