import type { Request, Response } from "express";
import { ValidCreateUserSchema } from "../validation/ValidCreateUserSchema.js";
import { createUser, deleteUserById } from "../../services/user.js";
import { checkAuth, createToken } from "../../services/auth.js";
import { JWT_OPTION } from "../../../../shared/constants.js";

export const create = async (req: Request, res: Response) => {
  const validation = ValidCreateUserSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(422).json({
      error: {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: validation.error.issues,
      },
    });
  }

  const data = validation.data;
  try {
    const user_id = await createUser(data);
    const token = createToken({ email: data.email, id: user_id });
    res.cookie("session-token", token, JWT_OPTION);
    return res.status(201).json({
      data: {
        id: user_id,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
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
export const auth = async (req: Request, res: Response) => {
  try {
    const user = checkAuth(req.cookies["session-token"]);
    if (user) {
      return res.status(200).json({ data: user });
    }

    return res.status(401).json({
      error: { message: "User isn`t authuficated", code: "AUTH_ERROR" },
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
export const deleteUser = (req: Request, res: Response) => {
  try {
    const user = checkAuth(req.cookies["session-token"]);
    if (user) {
      const result = deleteUserById(user.id);
      if (result.deleted) {
        res.clearCookie("session-token", JWT_OPTION);
        return res.status(200).json({
          data: {
            message: "You deleted successfully",
            changes: result.changes,
            user_id: result.user_id,
          },
        });
      }
      return res.status(404).json({
        error: {
          message: "Your account not found",
          code: "NOT_FOUND",
        },
      });
    }

    return res.status(401).json({
      error: { message: "User isn`t authuficated", code: "AUTH_ERROR" },
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

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("session-token", JWT_OPTION);
    return res.status(200).json({ data: { message: "Success logout" } });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
