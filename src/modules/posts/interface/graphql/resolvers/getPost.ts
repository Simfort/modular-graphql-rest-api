import type { Context } from "../../../../../graphql/context.js";

import { getPostById } from "../../../services/post.js";

type UpdateUserArgs = { id: string };
export const getPost = (
  parent: any,
  { id }: UpdateUserArgs,
  context: Context,
  info: any,
) => {
  try {
    const post = getPostById(id);
    return post;
  } catch (error) {
    console.error(error);
  }
};
