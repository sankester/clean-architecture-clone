export const authenticateDataSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
    expiredAt: {
      type: 'string',
    },
  },
  required: ['accessToken', 'name'],
};
