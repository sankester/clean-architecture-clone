import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';

export const createApolloServer = (
  config: ApolloServerExpressConfig
): ApolloServer => {
  const server = new ApolloServer(config);
  return server;
};
