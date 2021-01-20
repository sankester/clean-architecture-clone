import { logger } from '@backend/infrastructure/winston';
import cors from 'cors';
import { Express } from 'express';
import { bodyParser } from '../middleware/body-parser';
import { contentType } from '../middleware/content-type';

export default (app: Express) => {
  logger.debug('setup middleware');
  app.use(bodyParser);
  app.use(cors());
  app.use(contentType);
};
