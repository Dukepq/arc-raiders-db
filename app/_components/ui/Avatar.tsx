import { User } from "@/app/types/auth";
import cn from "@/app/utils/cn";

type AvatarProps = {
  username: string;
  role?: User["role"];
};
export default function Avatar({ username, role }: AvatarProps) {
  return (
    <div
      className={cn(
        "size-12 bg-background mr-3 rounded-sm grid place-content-center",
        role === "ADMIN" && "border border-arc-rarity-scarce"
      )}
    >
      <span className="text-[150%] font-extralight select-none">
        {username[0]}
      </span>
    </div>
  );
}
