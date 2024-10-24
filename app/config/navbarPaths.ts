export const paths = {
  db: "/db/search",
  dbItems: "/db/search/items",
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
