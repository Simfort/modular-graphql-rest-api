import type { Request } from "express";
import { checkAuth, type JWT_PAYLOAD } from "../modules/auth/services/auth.js";

export interface Context {
  user: JWT_PAYLOAD | null;
}
export const contextAuth = async ({ req }: { req: Request }) => {
  try {
    const sessionToken = req.cookies["session-token"];
    const verify = checkAuth(sessionToken);
    return { user: verify };
  } catch (error) {
    console.error(error);
    return { user: null };
  }
};
