export default function Page() {
  return (
    <main className="max-w-screen-xl mx-auto px-3">
      <div className="bg-backdrop rounded-sm p-6 mt-6">
        <h1 className="text-3xl mb-6 font-medium">Terms and conditions</h1>
        <p>
          A license has <span className="font-bold">not</span> been granted for
          the following:
        </p>
        <ul className="[&>div]:flex [&>div]:items-center [&>div]:gap-2 flex flex-col gap-0.5 mt-0.5">
          <div>
            <span className="size-1.5 bg-accent"></span>
            <li>
              Extract or copy content using automated tools or manual methods.
            </li>
          </div>
          <div>
            <span className="size-1.5 bg-accent"></span>
            <li>
              Access content through unconventional means, such as scripts. This
              sites content is meant to be consumed through a standard web
              browser.
            </li>
          </div>
          <div>
            <span className="size-1.5 bg-accent"></span>
            <li>
              Republish our content elsewhere without authorization, except as
              allowed by law (e.g., fair use).
            </li>
          </div>
        </ul>
      </div>
    </main>
  );
}
