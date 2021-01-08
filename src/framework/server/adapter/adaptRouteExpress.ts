import { Controller } from '@adapter/protocol';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async function (req: Request, res: Response): Promise<void> {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.code >= 200 && httpResponse.code <= 299) {
      res.status(httpResponse.code).json(httpResponse.body);
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
