import { Request } from 'express';
import { Controller } from '@adapter/protocol/Controller';

export const adaptController = async (req: Request, controller: Controller) => {
  const request = {
    ...(req.body || {}),
    ...(req.params || {}),
  };
  await controller.handle(request);
};
