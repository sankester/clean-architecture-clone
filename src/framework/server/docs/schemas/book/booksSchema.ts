export const booksSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        $ref: "#/schemas/book",
      },
    },
  },
  required: ["data"],
};
