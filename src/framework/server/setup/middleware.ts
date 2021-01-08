import { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { contentType } from '../middleware/content-type';
import { logger } from '@framework/library/winston';

export default (app: Express) => {
  logger.debug('setup middleware');
  app.use(bodyParser.json());
  app.use(cors());
  app.use(contentType);
};
