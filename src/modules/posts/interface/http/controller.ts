import type { Request, Response } from "express";
import { checkAuth } from "../../../auth/services/auth.js";
import { ValidCreatePostSchema } from "../validation/ValidCreatePostSchema.js";
import {
  createPost,
  deletePostById,
  getPostById,
} from "../../services/post.js";
import { DatabaseError } from "../../../../shared/errors/DatabaseError.js";

export const create = async (req: Request, res: Response) => {
  try {
    const authUser = checkAuth(req.cookies["session-token"]);
    if (!authUser) {
      return res.status(401).json({
        error: { message: "User isn`t authuficated", code: "AUTH_ERROR" },
      });
    }
    const { success, data, error } = ValidCreatePostSchema.safeParse({
      ...req.body,
      author_id: authUser.id,
    });
    if (success) {
      const post_id = createPost(data);
      return res.status(201).json({
        data: {
          id: post_id,
          title: data.title,
          description: data.description,
        },
      });
    }
    return res.status(422).json({
      error: {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.issues,
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof DatabaseError) {
      return res.status(404).json({
        error: {
          message: "Author not found",
          code: "AUTHOR_ID_ERROR",
        },
      });
    }
    return res.status(500).json({
      error: {
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  try {
    const authUser = checkAuth(req.cookies["session-token"]);
    const post_id = req.params.post_id as string;
    if (!authUser) {
      return res.status(401).json({
        error: { message: "User not authentified", code: "AUTH_ERROR" },
      });
    }
    const result = deletePostById(post_id, authUser.id);
    if (!result.deleted) {
      return res.status(404).json({
        error: {
          message: "Post not found or you are not the author",
          code: "NOT_FOUND",
        },
      });
    }
    return res.status(200).json({
      data: {
        message: "Post deleted successfully",
        post_id: result.post_id,
        changes: result.changes,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
export const getPost = async (req: Request, res: Response) => {
  try {
    const authUser = checkAuth(req.cookies["session-token"]);
    const post_id = req.params.post_id as string;
    if (!authUser) {
      return res.status(401).json({
        error: { message: "User not authentified", code: "AUTH_ERROR" },
      });
    }
    const post = getPostById(post_id);
    if (!post) {
      return res.status(404).json({
        error: {
          message: "Post not found",
          code: "NOT_FOUND",
        },
      });
    }
    return res.status(200).json({
      data: {
        ...post,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
