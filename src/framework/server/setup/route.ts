import { logger } from '@framework/library/winston';
import { Express, Router } from 'express';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  logger.debug('setup router');
  const router = Router();
  app.use('/api', router);
  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
};
