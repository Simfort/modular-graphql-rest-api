import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express5";
import { authRouter } from "./modules/auth/route.js";
import { contextAuth } from "./graphql/context.js";
import { schema } from "./graphql/schema.js";
import { updateUser } from "./graphql/resolvers/updateUser.js";

const app = express();
const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Mutation: {
      updateUser: updateUser,
    },
  },
});
const PORT = process.env.PORT || 3000;

await apolloServer.start();

app.use(cors({ origin: "*" }), cookieParser(), express.json());
app.use("/graphql", expressMiddleware(apolloServer, { context: contextAuth }));
app.use("/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
