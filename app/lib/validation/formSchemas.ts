import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(5, "username must be at least 5 characters long")
    .max(20, "username must be less than 20 characters long"),
});
