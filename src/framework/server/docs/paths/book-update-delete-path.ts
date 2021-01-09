export const bookUpdateDeletePath = {
  put: {
    tags: ['Book'],
    summary: 'Update Book',
    description: 'Update book in server',
    parameters: [
      {
        in: 'path',
        name: 'bookId',
        description: 'ID of book',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateBookParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success update book',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  $ref: '#/schemas/updateBookResponse',
                },
                {
                  $ref: '#/schemas/errorResponse',
                },
              ],
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
  delete: {
    tags: ['Book'],
    summary: 'Delete Book',
    description: 'Delete book in server',
    parameters: [
      {
        in: 'path',
        name: 'bookId',
        description: 'ID of book',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Success update book',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  $ref: '#/schemas/successResponse',
                },
                {
                  $ref: '#/schemas/errorResponse',
                },
              ],
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
