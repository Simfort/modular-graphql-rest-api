import type { User } from "../../modules/auth/model.js";
import { db } from "../../shared/db.js";
import type { Context } from "../context.js";

type UpdateUserArgs = Partial<
  Pick<User, "id" | "email" | "firstname" | "lastname">
>;

export const updateUser = (
  parent: any,
  args: UpdateUserArgs,
  context: Context,
  info: any,
) => {
  try {
    if (context.user) {
      const updates = Object.keys(args).map((key) => `${key} = ?`);
      const values = Object.values(args);
      db.prepare(
        `--sql
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = ?
        `,
      ).run(...values, context.user.id);
      return args;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};
