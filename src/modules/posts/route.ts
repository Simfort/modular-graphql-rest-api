import { Router } from "express";
import { create, deletePost } from "./controller.js";

export const routerPosts = Router();

routerPosts.post("/", create);
routerPosts.delete("/:post_id", deletePost);
