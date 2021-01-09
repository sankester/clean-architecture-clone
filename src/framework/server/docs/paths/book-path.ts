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
  post: {
    tags: ['Book'],
    summary: 'Create new book',
    description: 'create new book and save in database',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addBookParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Success created new book',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/successResponse',
            },
          },
        },
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
