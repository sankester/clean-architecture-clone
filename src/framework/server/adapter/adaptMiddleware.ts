import { ResponseBody } from '@adapter/presentation/protocol/ResponseBody';
import { Middleware } from '@adapter/protocol/Middleware';
import { NextFunction, Request, Response } from 'express';

export const adaptMiddleware = (middleware: Middleware) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const request = {
      accessToken: req.headers['access-token'],
      ...(req.headers || {}),
    };

    const httpResponse = await middleware.handle(request);
    if (httpResponse.code === 200) {
      Object.assign(req, (httpResponse.body as ResponseBody).data);
      next();
    } else {
      res.status(httpResponse.code).json({
        error: {
          type: httpResponse.type,
          message: (httpResponse.body as Error).message,
        },
      });
    }
  };
};
