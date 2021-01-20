import { createExpressApp } from '@backend/infrastructure/express/createServer';
import setup from './setup';
import { Express } from 'express';

export const createRestApp = (): Express => {
  const expressApp = createExpressApp();
  setup(expressApp);
  return expressApp;
};
