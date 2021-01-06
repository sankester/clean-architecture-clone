export const bookSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
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
  required: ['id', 'title', 'author', 'issn'],
};
