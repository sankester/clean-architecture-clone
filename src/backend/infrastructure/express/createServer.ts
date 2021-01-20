import express, { Express } from 'express';

export const createExpressApp = (): Express => {
  // Create Express app instance
  const app = express();
  return app;
};
