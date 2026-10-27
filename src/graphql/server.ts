import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.js";
import { updateUser } from "../modules/auth/index.js";
import { getPostResolver } from "../modules/posts/index.js";

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
});
await apolloServer.start();
