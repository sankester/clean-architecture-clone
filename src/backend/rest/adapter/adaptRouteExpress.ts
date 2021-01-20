import { Request, Response } from 'express';
import { Handler } from '../factories/protocol/Handler';
import { adaptController } from './adaptController';
import { adaptPresenter } from './adaptPresenter';

export const adaptRoute = (handler: Handler) => {
  return async function (req: Request, res: Response): Promise<void> {
    await adaptController(req, handler.controller);
    adaptPresenter(res, handler.presenter);
  };
};
