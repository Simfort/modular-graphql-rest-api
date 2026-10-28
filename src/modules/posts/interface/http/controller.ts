import type { Request, Response } from "express";
import { checkAuth } from "../../../auth/services/auth.js";
import { ValidCreatePostSchema } from "../validation/ValidCreatePostSchema.js";
import {
  createPost,
  deletePostById,
  getPostById,
  getPostsOffset,
} from "../../services/post.js";
import { DatabaseError } from "../../../../shared/errors/DatabaseError.js";
import { getCache, setCache } from "../../../../shared/utils/cache.js";
import { TTL_CACHE } from "../../../../shared/constants.js";

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
    const post_id = req.params.post_id as string;

    const cache = getCache(post_id);

    if (cache) {
      return res.status(200).json({
        data: {
          ...cache,
        },
      });
    }

    const post = getPostById(post_id);

    setCache(post_id, post, TTL_CACHE);
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

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const cacheKey = `p${page}s${pageSize}`;
    const cache = getCache<ReturnType<typeof getPostsOffset>>(cacheKey);
    if (cache) {
      console.log(cache);
      return res.status(200).json({
        data: {
          posts: cache.posts,
          meta: {
            total: cache.total,
            pages: Math.ceil(cache.total / pageSize),
            hasNext: offset + cache.posts.length < cache.total,
            left: Math.abs(cache.total - page * pageSize),
          },
        },
      });
    }

    const result = getPostsOffset(pageSize, offset);
    setCache(cacheKey, result, TTL_CACHE);
    return res.status(200).json({
      data: {
        posts: result.posts,
        meta: {
          total: result.total,
          pages: Math.ceil(result.total / pageSize),
          hasNext: offset + result.posts.length < result.total,
          left: Math.abs(result.total - page * pageSize),
        },
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
