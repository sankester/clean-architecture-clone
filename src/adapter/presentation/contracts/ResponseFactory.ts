import { HttpBodyBuilder } from "../builder/HttpBodyBuilder";
import { HttpResponseFactory } from "./HttpResponseFactory";

export interface ResponseFactory {
    makeResponse(): HttpResponseFactory
    makeBody(): HttpBodyBuilder
}