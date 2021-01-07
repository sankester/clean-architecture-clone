import { Express } from 'express';

export default (app: Express) => {
  // error customization, if request is invalid
  app.use('*', function (_req, res) {
    res.status(404).json({
      error: {
        type: 'not_found',
        message: 'Not Found Endpoint',
      },
    });
  });
};
