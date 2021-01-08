import { Response } from '@adapter/presentation/protocol/Response';

export interface Controller<T = any> {
  handle(request: T): Promise<Response>;
}
