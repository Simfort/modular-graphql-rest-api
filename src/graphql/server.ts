import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.js";
import { updateUser } from "../modules/auth/index.js";
import { getPostResolver } from "../modules/posts/index.js";
import depthLimit from "graphql-depth-limit";

export const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Mutation: {
      updateUser: updateUser,
    },
    Query: {
      post: getPostResolver,
    },
  },
  validationRules: [depthLimit(7)],
});
await apolloServer.start();
