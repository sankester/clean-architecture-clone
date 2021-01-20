import { LoginController } from '@adapter/controller/account/LoginController';
import { SingupController } from '@adapter/controller/account/SignUpController';
import faker from 'faker';

export const mockLoginRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockSignupRequest = (): SingupController.Request => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
