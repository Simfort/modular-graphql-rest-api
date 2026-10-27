import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express5";
import { contextAuth } from "./graphql/context.js";
import { schema } from "./graphql/schema.js";
import { updateUser } from "./modules/auth/resolvers/updateUser.js";
import { getPost } from "./modules/posts/resolvers/getPost.js";
import { routerV1 } from "./route.js";

const app = express();
const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Mutation: {
      updateUser: updateUser,
    },
    Query: {
      post: getPost,
    },
  },
});
const PORT = process.env.PORT || 3000;

await apolloServer.start();

app.use(cors({ origin: "*" }), cookieParser(), express.json());
app.use("/graphql", expressMiddleware(apolloServer, { context: contextAuth }));
app.use("/v1", routerV1);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
