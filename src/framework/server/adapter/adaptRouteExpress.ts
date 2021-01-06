import { Controller } from '@adapter/protocols';
import { Request, Response } from 'express';
import { MakeResponse } from '@adapter/presentation/factories/MakeResponse';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request, new MakeResponse());
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
