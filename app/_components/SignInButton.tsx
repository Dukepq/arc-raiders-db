"use client";

import DialogWrap, { DialogTitle } from "./ui/Dialog";
import { useSessionContext } from "../context/sessionContext";
import UserButton from "./UserButton";
import { buttonOptions } from "./ui/Button";
import cn from "../utils/cn";
import { Discord, Google, Twitch } from "./ui/Icons";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default function SignInOutButton() {
  const { user } = useSessionContext();
  if (user?.username) {
    return <UserButton username={user.username} />;
  }
  return <SignInButton />;
}

export function SignInButton() {
  const { loading } = useSessionContext();
  return (
    <DialogWrap
      trigger={
        <button
          disabled={loading === "loading"}
          className={cn(buttonOptions({ variant: "timid", size: "default" }))}
        >
          Sign In
        </button>
      }
    >
      <div
        className={`px-6 py-12 bg-backdrop max-w-128 w-full flex justify-center items-center flex-col
gap-3 rounded-md [&>a]:rounded-sm [&>a]:border-border-grey sm:[&>a]:w-80 [&>a]:w-auto
[&>a]:border [&>a]:px-3 [&>a]:py-2 [&>a]:transition-colors [&>a]:duration-25
border border-border-grey text-nowrap
`}
      >
        <div className="flex w-full items-center justify-center">
          <div style={{ height: 1 }} className="w-20 opacity-25 bg-text"></div>
          <DialogTitle className="px-3 font-semibold text-lg">
            sign-in
          </DialogTitle>
          <div style={{ height: 1 }} className="w-20 opacity-25 bg-text"></div>
        </div>
        <OAuthSignInButton
          description="Sign in with Discord."
          href={`${BASE_URL}/api/auth/login/discord`}
          icon={<Discord className="fill-text size-6" />}
        />
        <OAuthSignInButton
          description="Sign in with Twitch."
          href={`${BASE_URL}/api/auth/login/twitch`}
          icon={<Twitch className="fill-text size-6" />}
        />
        <OAuthSignInButton
          description="Sign in with Google."
          href={`${BASE_URL}/api/auth/login/google`}
          icon={<Google className="fill-text size-6" />}
        />
      </div>
    </DialogWrap>
  );
}

type OAuthSignInButtonProps = {
  description: string;
  href: string;
  icon: React.ReactNode;
};

export function OAuthSignInButton({
  description,
  href,
  icon,
}: OAuthSignInButtonProps) {
  return (
    <Link
      prefetch={false}
      className="hover:bg-border-grey [&>div>span]:text-l"
      href={href}
    >
      <div className="flex items-center gap-3 px-3">
        {icon}
        <div className="flex justify-center grow">
          <span className="text-">{description}</span>
        </div>
      </div>
    </Link>
  );
}
