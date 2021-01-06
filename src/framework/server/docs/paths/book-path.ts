export const bookPath = {
  get: {
    tags: ['Book'],
    summary: 'Get all book data',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/books',
            },
          },
        },
      },
      204: {
        $ref: '#/components/noContent',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
