import type { CookieOptions } from "express";
import { checkEnv } from "./utils/checkEnv.js";
import { config } from "dotenv";
config();

export const JWT_SECRET = checkEnv(
  "JWT SECRET IS UNDEFINED",
  process.env.JWT_SECRET,
);

export const MAX_AGE_SESSION_TOKEN = 1000 * 60 * 60 * 24 * 7;

export const JWT_OPTION: CookieOptions = {
  maxAge: MAX_AGE_SESSION_TOKEN,
  sameSite: "lax",
  httpOnly: true,
  secure: process.env?.NODE_ENV === "production",
};
export const TTL_CACHE = 1000 * 60 * 60;
