export const updateBookResponseSchema = {
  type: 'object',
  properties: {
    data: {
      $ref: '#/schemas/book',
    },
    success: {
      $ref: '#/schemas/successMessage',
    },
  },
};
