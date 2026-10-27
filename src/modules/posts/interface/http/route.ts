import { Router } from "express";
import { getPost, create, deletePost } from "./controller.js";

export const routerPosts = Router();

routerPosts.post("/", create);
routerPosts.delete("/:post_id", deletePost);
routerPosts.get("/:post_id", getPost);
