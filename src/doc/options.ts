import type { Options } from "swagger-jsdoc";
import swaggerJSDoc from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GRAPHQL-REST API",
      version: "1.0.0",
      description: "Example full-server graphql and rest api",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "session-token",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["message", "code"],
              properties: {
                message: {
                  type: "string",
                  example: "Internal Server Error",
                },
                code: {
                  type: "string",
                  example: "INTERNAL_SERVER_ERROR",
                },
              },
            },
          },
        },

        ErrorAuthResponse: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["message", "code"],
              properties: {
                message: {
                  type: "string",
                  example: "User not authentified",
                },
                code: {
                  type: "string",
                  example: "AUTH_ERROR",
                },
              },
            },
          },
        },

        Error404UserResponse: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["message", "code"],
              properties: {
                message: {
                  type: "string",
                  example: "Your account not found",
                },
                code: {
                  type: "string",
                  example: "NOT_FOUND",
                },
              },
            },
          },
        },
        Error404PostResponse: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["message", "code"],
              properties: {
                message: {
                  type: "string",
                  example: "Post not found or you are not the author",
                },
                code: {
                  type: "string",
                  example: "NOT_FOUND",
                },
              },
            },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["message", "code", "details"],
              properties: {
                message: {
                  type: "string",
                  example: "Validation failed",
                },
                code: {
                  type: "string",
                  example: "VALIDATION_ERROR",
                },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                  description: "Validation issues returned by Zod",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/modules/**/http/route.ts"],
};
export const swaggerSpec = swaggerJSDoc(options);
