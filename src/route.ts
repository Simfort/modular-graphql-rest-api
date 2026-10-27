import { Router } from "express";
import { routerPosts } from "./modules/posts/route.js";
import { routerAuth } from "./modules/auth/route.js";

export const routerV1 = Router();
routerV1.use("/auth", routerAuth);
routerV1.use("/posts", routerPosts);
