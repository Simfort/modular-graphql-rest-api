import z from "zod";

export const ValidCreateUserSchema = z.object({
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().min(6),
});
