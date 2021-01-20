export const signUpPath = {
  post: {
    tags: ['Account'],
    summary: 'Signup to server',
    description: 'Make account in server and autheticate',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success send request',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  type: 'object',
                  properties: {
                    data: {
                      $ref: '#/schemas/authenticateData',
                    },
                  },
                  required: ['data'],
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
