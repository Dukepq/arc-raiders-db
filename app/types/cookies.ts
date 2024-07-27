import { ProviderEnumType } from "@/drizzle";

export type UserData = {
  providerId: string;
  id: string;
  username: string;
  email: string;
};

export type JWTSession = {
  user: UserData | null;
  provider: ProviderEnumType;
  accesTokenExpiration: string;
  refreshToken: string;
};
