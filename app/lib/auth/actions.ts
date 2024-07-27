"use server";

import { logoutUser } from ".";

export const logoutAction = async () => {
  await logoutUser();
};
