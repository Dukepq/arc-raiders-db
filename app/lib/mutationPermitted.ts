import { User } from "../types/auth";

export default function mutationPermitted(user: User | null, ownerId: string) {
  return !!(user && (ownerId === user.userId || user.role === "ADMIN"));
}
