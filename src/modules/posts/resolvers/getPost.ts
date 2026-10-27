import type { Context } from "../../../graphql/context.js";
import { db } from "../../../shared/db.js";
import { getPost as getPostHelper } from "../services/post.js";

type UpdateUserArgs = { id: string };
export const getPost = (
  parent: any,
  { id }: UpdateUserArgs,
  context: Context,
  info: any,
) => {
  try {
    const post = getPostHelper(id);
    return post;
  } catch (error) {
    console.error(error);
  }
};
