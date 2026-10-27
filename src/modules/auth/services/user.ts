import { randomUUID } from "node:crypto";
import { db } from "../../../shared/db.js";
import type { User } from "../model.js";
import bcrypt from "bcrypt";

type CreateUserProps = Omit<User, "id" | "created_at">;

export const createUser = async (data: CreateUserProps) => {
  const hashPassword = await bcrypt.hash(data.password!, 10);
  const user_id = randomUUID();
  db.prepare(
    `--sql
    INSERT INTO users (id,firstname,lastname,password,email)
    VALUES(?,?,?,?,?)
  `,
  ).run(user_id, data.firstname, data.lastname, hashPassword, data.email);
  return user_id;
};
export const deleteUserById = (user_id: string) => {
  const stmt = db
    .prepare(
      `--sql
    DELETE FROM users
    WHERE id = ?
    `,
    )
    .run(user_id);
  return { deleted: stmt.changes > 0, changes: stmt.changes, user_id };
};
