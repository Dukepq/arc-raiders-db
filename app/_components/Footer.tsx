import Image from "next/image";
import logo from "@/public/logo-circular.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-backdrop px-3 py-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="[&>*]:block text-text/80 [&>*]:transition-colors text-sm">
          <Image className="w-8 mb-2" alt="logo" src={logo} />

          <Link className="hover:text-text/100 mb-1" href={"/"}>
            Privacy policy
          </Link>
          <Link className="hover:text-text/100 mb-1" href={"/"}>
            Terms of service
          </Link>
        </div>
        <hr className="opacity-50 my-3" />
        <div className="flex text-sm opacity-80">
          <span className="mb-1 mx-auto">{`Copyright © 2024-${new Date(
            Date.now()
          ).getFullYear()} ${process.env.DOMAIN}`}</span>
        </div>
      </div>
    </footer>
  );
}
