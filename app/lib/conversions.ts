export function rarityToName(rarity: number) {
  switch (rarity) {
    case 1:
      return "common";
    case 2:
      return "uncommon";
    case 3:
      return "rare";
    case 4:
      return "scarce";
    default:
      return "common";
  }
}

export function rarityNameToNum(rarity: string | undefined) {
  switch (rarity) {
    case "common":
      return 1;
    case "uncommon":
      return 2;
    case "rare":
      return 3;
    case "scarce":
      return 4;
    default:
      return undefined;
  }
}

export function rarityToColor(rarity: number) {
  switch (rarity) {
    case 1:
      return "#03CC7C";
    case 2:
      return "#54C8E7";
    case 3:
      return "#F32734";
    case 4:
      return "#ECA610";
    default:
      return "accent";
  }
}
export function raritiesToColorMap(rarities: number[]) {
  const colorMap = rarities.map((rarity) => {
    return rarityToColor(rarity);
  });
  return colorMap;
}
