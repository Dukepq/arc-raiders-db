export default function Page() {
  return (
    <main className="max-w-screen-xl mx-auto">
      <div className="bg-backdrop rounded-sm p-6 mt-6">
        <h1 className="text-3xl font-medium">Privacy Policy</h1>
        <span className="opacity-50 italic text-xs">
          last updated: 27 July, 2024
        </span>
        <h2 className="text-2xl font-medium mb-2 mt-4">
          Information we collect
        </h2>
        <div>
          <p>
            When you log in to the site we may collect some information you
            provide to us at your own volition such as your email address and
            username.
          </p>
          <p>
            If you do not log in, non of your personal information will be
            collected by us.
          </p>
        </div>
        <div className="mt-2">
          {/* <p>
            If you want to have your data removed from our database, you can do
            so by navigating to your profile and pressing the "delete data"
            button.
          </p> */}
        </div>

        <h2 className="text-2xl font-medium mb-2 mt-4">Use of Cookies</h2>
        <div>
          <p>To keep you logged in we need to keep track of your session.</p>
          <p>
            We do this through a cookie that stores a unique id associated with
            your session.
          </p>
        </div>
      </div>
    </main>
  );
}
