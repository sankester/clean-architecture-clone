import { Handler } from '@backend/infrastructure/common/factories/protocol/Handler';
import { ResponseBody } from '@adapter/presentation/protocol/ResponseBody';
import {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ApolloError,
} from 'apollo-server-express';

export const adaptResolver = async (
  handler: Handler,
  args?: any,
  context?: any
): Promise<ResponseBody | null> => {
  const request = {
    ...(args || {}),
    accountId: context?.req?.accountId,
  };

  const { controller, presenter } = handler;
  await controller.handle(request);
  const httpResponse = presenter.getResponse();

  switch (httpResponse.code) {
    case 200:
    case 201:
    case 204:
      return httpResponse.body as any;
    case 400:
      throw new UserInputError((httpResponse.body as Error).message);
    case 401:
      throw new AuthenticationError((httpResponse.body as Error).message);
    case 403:
      throw new ForbiddenError((httpResponse.body as Error).message);
    default:
      throw new ApolloError((httpResponse.body as Error).message);
  }
};
