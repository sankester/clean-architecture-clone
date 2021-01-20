export const bookGetUpdateDeletePath = {
  get: {
    tags: ['Book'],
    summary: 'Get detail book',
    description: 'Get detail data book by id',
    parameters: [
      {
        in: 'path',
        name: 'bookId',
        descriptio: 'ID of Book',
        required: true,
        scheme: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Success load book',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  $ref: '#/schemas/book',
                },
              },
            },
          },
        },
      },
      403: {
        $ref: '#/components/forbidden',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  put: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
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
      403: {
        $ref: '#/components/forbidden',
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
    security: [
      {
        apiKeyAuth: [],
      },
    ],
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
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
