import { randomBytes } from "node:crypto";
import { db } from "../../../shared/db.js";
import type { Post } from "../model.js";
import { DatabaseError } from "../../../shared/errors/DatabaseError.js";
import type { User } from "../../auth/model.js";

type PostWithUserRaw = Post & Omit<User, "id" | "password">;

export const createPost = (data: Partial<Post>) => {
  const { title, description, author_id } = data;
  const post_id = randomBytes(12).toString("base64");
  try {
    db.prepare(
      `INSERT INTO posts (id, title, description, author_id)
       VALUES (?, ?, ?, ?)`,
    ).run(post_id, title, description, author_id);
    return post_id;
  } catch (e) {
    if (String(e).includes("FOREIGN KEY constraint failed")) {
      throw new DatabaseError(`User with id ${author_id} does not exist`);
    }
    throw e;
  }
};
export const getPostById = (id: string) => {
  const post =
    (db
      .prepare(
        `--sql
    SELECT 
    p.id,
    p.title,
    p.description,
    p.author_id,
    u.firstname,
    u.lastname,
    u.email,
    p.created_at 
    FROM posts as p
    LEFT JOIN users as u
    ON u.id = p.author_id 
    WHERE p.id = ?
    `,
      )
      .get(id) as PostWithUserRaw) || null;
  if (post) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      author: {
        id: post.author_id,
        firstname: post.firstname,
        lastname: post.lastname,
        email: post.email,
      },
      created_at: post.created_at,
    };
  }
  return null;
};
export const deletePostById = (post_id: string, author_id: string) => {
  const stmt = db.prepare(
    `--sql
    DELETE FROM posts
    WHERE id = ?
      AND author_id = ?
    `,
  );
  const result = stmt.run(post_id, author_id);

  return {
    deleted: result.changes > 0,
    changes: result.changes,
    post_id,
  };
};
