export const successResponseSchema = {
  type: 'object',
  properties: {
    success: {
      $ref: '#/schemas/successMessage',
    },
  },
};
