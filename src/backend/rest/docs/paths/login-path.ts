export const loginPath = {
  post: {
    tags: ['Account'],
    summary: 'Login to server',
    description: 'Authenticate user and get access token',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success send request to server',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  $ref: '#/schemas/authenticateData',
                },
              },
              required: ['data'],
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
