import { Router } from "express";
import { auth, create, logout } from "./controller.js";

export const authRouter = Router();

authRouter.post("/", create);
authRouter.get("/", auth);
authRouter.get("/actions/logout", logout);
