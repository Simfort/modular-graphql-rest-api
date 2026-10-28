import { Router } from "express";
import { create, deletePost, getPost, getPosts } from "./controller.js";

export const routerPosts = Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts management
 */

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               description:
 *                 type: string
 *                 example: Description of my post
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Created post ID
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *       '401':
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '422':
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '404':
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerPosts.post("/", create);

/**
 * @swagger
 * /api/v1/posts/{post_id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: post_id
 *         in: path
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Post deleted successfully
 *                     post_id:
 *                       type: string
 *                     changes:
 *                       type: integer
 *       '401':
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorAuthResponse'
 *       '404':
 *         description: Post not found or user is not the author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404PostResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerPosts.delete("/:post_id", deletePost);

/**
 * @swagger
 * /api/v1/posts/{post_id}:
 *   get:
 *     summary: Get a single post
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Post returned by getPostById
 *                   additionalProperties: true
 *       '404':
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404PostResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerPosts.get("/:post_id", getPost);

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get a paginated list of posts
 *     tags: [Posts]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: Number of posts per page
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         additionalProperties: true
 *                     meta:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           description: Total number of posts
 *                         pages:
 *                           type: integer
 *                           description: Total number of pages
 *                         hasNext:
 *                           type: boolean
 *                           description: Whether another page exists
 *                         left:
 *                           type: integer
 *                           description: Absolute difference between total posts and page capacity
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerPosts.get("/", getPosts);
