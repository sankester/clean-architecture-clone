export const successMessageSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
  },
  required: ['message'],
};
