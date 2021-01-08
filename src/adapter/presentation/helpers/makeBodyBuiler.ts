import { HttpBodyBuilder } from '../builder/HttpBodyBuilder';

export const makeBodyBuilder = () => {
  return new HttpBodyBuilder();
};
