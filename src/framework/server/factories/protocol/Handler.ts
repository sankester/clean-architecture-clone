import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';

export type Handler = {
  controller: Controller;
  presenter: Presenter;
};
