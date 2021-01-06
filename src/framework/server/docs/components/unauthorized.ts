export const unauthorized = {
  description: "Unautorized",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/errorResponse",
      },
    },
  },
};
