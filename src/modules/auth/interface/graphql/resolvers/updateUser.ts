import type { Context } from "../../../../../graphql/context.js";
import { db } from "../../../../../shared/db.js";
import type { User } from "../../../model.js";

type UpdateUserArgs = {
  data: Partial<Pick<User, "id" | "email" | "firstname" | "lastname">>;
};

export const updateUser = (
  parent: any,
  { data }: UpdateUserArgs,
  context: Context,
  info: any,
) => {
  try {
    if (context.user) {
      const updates = Object.keys(data).map((key) => `${key} = ?`);
      const values = Object.values(data);
      db.prepare(
        `--sql
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = ?
        `,
      ).run(...values, context.user.id);
      return data;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};
