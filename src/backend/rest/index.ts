import { Express } from 'express';
import setup from './setup';

export const createRestApp = (expressApp: Express): Express => {
  setup(expressApp);
  return expressApp;
};
