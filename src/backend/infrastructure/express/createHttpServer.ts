import { Express } from 'express';
import http from 'http';

export const createHttpServer = (app: Express): http.Server => {
  const httpServer = http.createServer(app);
  return httpServer;
};
