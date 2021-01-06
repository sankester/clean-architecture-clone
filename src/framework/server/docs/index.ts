import paths from './paths';
import schemas from './schemas';
import components from './components';

export default {
  openapi: '3.0.3',
  info: {
    title: 'clean architecture clone',
    description: 'simple rest api with clean architecture',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'sankesterfire@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
      description: 'Simple API',
    },
  ],
  tags: [
    {
      name: 'Book',
      description: 'Endpoint Book Entity',
    },
  ],
  paths,
  schemas,
  components,
};
