import { Router } from "express";
import { auth, create, deleteUser, logout } from "./controller.js";

export const routerAuth = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User registration and authentication
 */

/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstname
 *               - lastname
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       '201':
 *         description: User registered successfully. Session cookie is set.
 *         headers:
 *           Set-Cookie:
 *             description: Session authentication cookie
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Created user ID
 *                     email:
 *                       type: string
 *                       format: email
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *       '422':
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerAuth.post("/", create);

/**
 * @swagger
 * /api/v1/auth:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Authenticated user returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                       format: email
 *       '401':
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorAuthResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerAuth.get("/", auth);

/**
 * @swagger
 * /api/v1/auth/actions/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: Logout successful. Session cookie is cleared.
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
 *                       example: Success logout
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerAuth.get("/actions/logout", logout);

/**
 * @swagger
 * /api/v1/auth:
 *   delete:
 *     summary: Delete the authenticated user's account
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: User account deleted successfully. Session cookie is cleared.
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
 *                       example: You deleted successfully
 *                     changes:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *       '401':
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorAuthResponse'
 *       '404':
 *         description: User account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404UserResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routerAuth.delete("/", deleteUser);
