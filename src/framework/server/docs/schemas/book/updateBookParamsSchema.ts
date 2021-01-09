export const updateBookParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    issn: {
      type: 'string',
    },
  },
  required: ['title', 'author', 'issn'],
};
