import { JWT_SECRET } from "../../../shared/constants.js";
import { db } from "../../../shared/db.js";
import type { User } from "../model.js";
import jwt from "jsonwebtoken";

export type JWT_PAYLOAD = Pick<User, "email" | "id">;

export const createToken = (data: JWT_PAYLOAD) => {
  const token = jwt.sign(data, JWT_SECRET);
  return token;
};

export const checkAuth = (token: string) => {
  if (!token) return null;
  try {
    const user = jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;

    const findedData =
      db
        .prepare(
          `--sql
        SELECT id,email FROM users
        WHERE email = ? AND id = ?
    `,
        )
        .get(user.email, user.id) || null;

    return findedData as JWT_PAYLOAD | null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
