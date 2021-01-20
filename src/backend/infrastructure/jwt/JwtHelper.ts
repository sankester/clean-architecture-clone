import fs from 'fs';
import config from '@backend/infrastructure/config/index';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';

export const signOptions: SignOptions = {
  expiresIn: `${config.tokenExpiresIn}d`,
};

export const verifyOptions: VerifyOptions = {
  algorithms: ['RS256'],
};

export const getPrivateSecret = () => {
  const privateKey = fs.readFileSync(config.privateKeyFile);
  return {
    key: privateKey,
    passphrase: config.privateKeyPassphrase,
  };
};

export const getPublicKey = () => fs.readFileSync(config.publicKeyFile);
