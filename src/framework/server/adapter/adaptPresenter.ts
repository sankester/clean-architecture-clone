import { Presenter } from '@adapter/protocol/Presenter';
import { Response } from 'express';

export const adaptPresenter = (res: Response, presenter: Presenter) => {
  const httpResponse = presenter.getResponse();

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
