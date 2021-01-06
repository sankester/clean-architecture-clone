import { HttpBodyBuilder } from "../builder/HttpBodyBuilder";
import { HttpResponseFactory } from "../contracts/HttpResponseFactory";
import { ResponseFactory } from "../contracts/ResponseFactory";
import { HttpMakeResponse } from "./HttpMakeResponse";

export class MakeResponse implements ResponseFactory {
  
  makeResponse(): HttpResponseFactory {
    return new HttpMakeResponse();
  }

  makeBody(): HttpBodyBuilder {
    return new HttpBodyBuilder();
  }
}
