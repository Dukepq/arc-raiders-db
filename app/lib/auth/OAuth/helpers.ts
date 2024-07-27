"server-only";

import { createHash, getRandomValues, randomBytes } from "crypto";

export const generateRandomHex = (length: number = 32): string => {
  const buffer = getRandomValues(new Uint8Array(length));
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const generateCodeVerifier = (length: number = 64) => {
  return randomBytes(length).toString("base64url");
};

export const generateCodeChallenge = (verifier: string) => {
  const hashBytes = createHash("SHA256").update(verifier).digest();
  return hashBytes.toString("base64url");
};
