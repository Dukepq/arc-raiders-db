import { z } from "zod";

export const itemSearchParamsSchema = z.object({
  itemId: z.string(),
});

export const itemsBodySchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
  rarity: z.number().optional(),
  sort: z.string().optional(),
});
