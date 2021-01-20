import { SignUpPresenter } from '@adapter/presentation/presenters/account/SignUpPresenter';
import faker from 'faker';

export const mockAuthenticationPresenter = (): SignUpPresenter.Data => ({
  accessToken: faker.random.uuid(),
  accountId: faker.random.uuid(),
  expiredAt: new Date(),
});
