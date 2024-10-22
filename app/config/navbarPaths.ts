export const paths = {
  db: "/db",
  dbItems: "/db/items",
  dbEnemies: "/db/enemies",
  maps: "/maps",
  equipment: "/equipment",
  news: "/news",

  get mapSpaceport() {
    return this.maps + "/spaceport";
  },
  get mapDam() {
    return this.maps + "/dam";
  },
  get newsNotes() {
    return this.news + "/notes";
  },
};
