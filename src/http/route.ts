import { Router } from "express";
import { routerAuth } from "../modules/auth/index.js";
import { routerPosts } from "../modules/posts/index.js";

export const routerV1 = Router();
routerV1.use("/auth", routerAuth);
routerV1.use("/posts", routerPosts);
