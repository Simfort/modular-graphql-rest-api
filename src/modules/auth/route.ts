import { Router } from "express";
import { auth, create, logout } from "./controller.js";

export const routerAuth = Router();

routerAuth.post("/", create);
routerAuth.get("/", auth);
routerAuth.get("/actions/logout", logout);
