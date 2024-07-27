import { ALLOWED_SORTING_FIELD_NAMES } from "../config/config";

function sortingParamValid(sortingName: string) {
  const constituents = getSortSearchParamConstituents(sortingName);
  return constituents && ALLOWED_SORTING_FIELD_NAMES.includes(constituents[0]);
}

export function getSortSearchParamConstituents(
  param: string | undefined | null
): [string, "asc" | "desc"] | null {
  if (!param || !param.includes("_")) return null;
  const [sortName, sortDirection] = param.split("_") as [string, string];
  if (sortDirection !== "asc" && sortDirection !== "desc") return null;
  return [sortName, sortDirection] as [string, "asc" | "desc"];
}
