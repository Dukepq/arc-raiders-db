import "server-only";

import { commentsDL } from "./comments";
import { usersDL } from "./users";
import { itemsDL } from "./items";
import { sessionsDL } from "./sessions";

const DL = {
  query: {
    comments: commentsDL.query,
    users: usersDL.query,
    items: itemsDL.query,
    sessions: sessionsDL.query,
  },
  mutation: {
    comments: commentsDL.mutation,
    users: usersDL.mutation,
    items: itemsDL.mutation,
    sessions: sessionsDL.mutation,
  },
};

export default DL;
