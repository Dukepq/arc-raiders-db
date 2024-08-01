export type Rarities = "common" | "uncommon" | "rare" | "scarce";
export const rarities = ["common", "uncommon", "rare", "scarce"] as const;
export const MAX_ITEMS_PER_PAGE = 8;
export const ALLOWED_SEARCH_PARAMS = ["page", "rarity", "sort", "type"];
export const ALLOWED_SORTING_FIELD_NAMES = ["name", "weight"];
export const MAP_WIDTH = 1600;
export const SESSION_LIFETIME = 1000 * 60 * 60 * 24 * 30;
export const commentsConfig = {
  offset: 0,
  timespan: 1000 * 60 * 5,
  loadAmount: 6,
};
