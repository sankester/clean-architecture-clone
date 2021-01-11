import { SignUpPresenter } from '@adapter/presentation/presenter/account/SignUpPresenter';
import faker from 'faker';

export const mockAuthenticationPresenter = (): SignUpPresenter.Data => ({
  accessToken: faker.random.uuid(),
  name: faker.name.firstName(),
});
