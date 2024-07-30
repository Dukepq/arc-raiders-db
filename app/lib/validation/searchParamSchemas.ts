import { ALLOWED_SORTING_FIELD_NAMES, rarities } from "@/app/config/constants";
import { z } from "zod";

export const searchParamSchema = z.object({
  rarity: z.enum(rarities).optional(),
  page: z.coerce.number().optional(),
  sort: z
    .string()
    .regex(
      new RegExp(`^(${ALLOWED_SORTING_FIELD_NAMES.join("|")})_(asc|desc)$`)
    )
    .optional(),
  type: z.string().optional(),
});
