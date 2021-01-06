import { HttpBody } from './HttpBody';

export class HttpResponse {
  constructor(
    public code: number,
    public body: HttpBody | Error | null,
    public type?: string
  ) {}
}
