export const forbidden = {
  description: "Forbidden Access",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/errorResponse",
      },
    },
  },
};
