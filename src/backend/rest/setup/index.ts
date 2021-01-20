import { Express } from 'express';
import setupMiddleware from './middleware';
import setupRoute from './route';
import setupLogger from './logger';
import setupSwagger from './swagger';

export default function (app: Express) {
  setupSwagger(app);
  setupMiddleware(app);
  setupLogger(app);
  setupRoute(app);
}
