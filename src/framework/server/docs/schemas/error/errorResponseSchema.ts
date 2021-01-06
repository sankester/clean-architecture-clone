export const errorResponse = {
  type: 'object',
  properties: {
    error: {
      $ref: '#/schemas/error',
    },
  },
  required: ['error'],
};
