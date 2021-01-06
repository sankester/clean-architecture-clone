export const errorSchema = {
  type: "object",
  properties: {
    type : {
      type: "string",
    },
    message: {
      type: "string",
    },
  },
  required: ["type", "message"],
};
