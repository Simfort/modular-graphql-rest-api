import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express5";
import { contextAuth } from "./graphql/context.js";
import { routerV1 } from "./http/route.js";
import { apolloServer } from "./graphql/server.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(
  "/graphql/v1",
  expressMiddleware(apolloServer, { context: contextAuth }),
);

app.use("/api/v1", routerV1);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
