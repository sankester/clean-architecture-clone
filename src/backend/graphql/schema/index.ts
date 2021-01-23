import { createApplication } from 'graphql-modules';
import { BookModule } from '../modules/BookModule';

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [BookModule],
});

// This is your actual GraphQL schema
export default application.createSchemaForApollo();
