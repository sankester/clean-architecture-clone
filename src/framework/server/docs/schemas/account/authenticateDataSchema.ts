export const authenticateDataSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  required: ['accessToken', 'name'],
};
