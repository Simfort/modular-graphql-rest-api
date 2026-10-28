import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express5";
import { contextAuth } from "./graphql/context.js";
import { routerV1 } from "./http/route.js";
import { apolloServer } from "./graphql/server.js";
import rateLimit from "express-rate-limit";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./doc/options.js";

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: {
      message: "Too many requests, please try again later.",
      code: "LIMIT_REQUEST",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(limiter);

app.use(
  "/graphql/v1",
  expressMiddleware(apolloServer, { context: contextAuth }),
);

app.use("/api/v1", routerV1);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
