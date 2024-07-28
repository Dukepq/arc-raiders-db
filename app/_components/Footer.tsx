import Image from "next/image";
import logo from "@/public/logo-circular.svg";
import ProgressLink from "./ui/ProgressLink";

export default function Footer() {
  return (
    <footer className="bg-backdrop px-3 py-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="[&_a]:underline [&_a]:text-text/80 [&_h3]:font-medium [&_h3]:text-lg flex flex-wrap gap-9">
          <div>
            <h3>Database</h3>
            <ul>
              <li>
                <ProgressLink
                  className="hover:text-text/100"
                  href="/db/search/items"
                >
                  items
                </ProgressLink>
              </li>
            </ul>
          </div>
          <div>
            <h3>News</h3>
            <ul>
              <li>
                <ProgressLink
                  className="hover:text-text/100"
                  href="/news/notes"
                >
                  patch notes
                </ProgressLink>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 opacity-80" />

        <div className="text-text/80 [&>*]:transition-colors text-sm flex sm:gap-6 gap-3 justify-center items-center flex-col sm:flex-row">
          <div className="flex items-center gap-3">
            <Image className="w-6" alt="logo" src={logo} />
            <span>{`Copyright © 2024-${new Date(Date.now()).getFullYear()} ${
              process.env.DOMAIN
            }`}</span>
          </div>

          <ProgressLink
            className="hover:text-text/100 underline"
            href={"/privacy-policy"}
          >
            Privacy policy
          </ProgressLink>
          <ProgressLink
            className="hover:text-text/100 underline"
            href={"/terms-and-conditions"}
          >
            Terms of service
          </ProgressLink>
        </div>
      </div>
    </footer>
  );
}
