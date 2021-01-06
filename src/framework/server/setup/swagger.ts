import docs from '@framework/server/docs';
import { serve, setup } from 'swagger-ui-express';
import { Express } from 'express';
import { logger } from '@adapter/utils/winston';
import { noCache } from '../middleware/no-chace';

export default (app: Express): void => {
  logger.debug('setup swagger ui');
  app.use('/api-docs', noCache, serve, setup(docs), setup(docs));
};
