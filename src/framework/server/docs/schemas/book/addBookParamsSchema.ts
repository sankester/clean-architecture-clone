export const addBookParamsSchema = {
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
