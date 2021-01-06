import { forbidden } from "./components/forbidden";
import { badRequest } from "./components/badRequest";
import { serverError } from "./components/serverError";
import { notFound } from "./components/notFound";
import { unauthorized } from "./components/unauthorized";
import { noContent } from './components/noContent';

export default {
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
  noContent
};
