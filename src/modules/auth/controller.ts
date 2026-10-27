import type { Request, Response } from "express";
import { ValidCreateUserSchema } from "./schemas/ValidCreateUserSchema.js";
import { createUser } from "./services/user.js";
import { checkAuth, createToken } from "./services/auth.js";
import { JWT_OPTION } from "../../shared/constants.js";
import type { User } from "./model.js";

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
    const sessionToken = req.cookies["session-token"];
    if (sessionToken) {
      const user = checkAuth(sessionToken);
      if (user) {
        return res.status(200).json({ data: user });
      }
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
    res.clearCookie("sessionk-token", JWT_OPTION);
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
