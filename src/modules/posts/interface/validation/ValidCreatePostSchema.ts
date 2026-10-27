import z from "zod";

export const ValidCreatePostSchema = z.object({
  title: z.string().nonempty(),
  author_id: z.string().nonempty(),
  description: z.string().optional(),
});
