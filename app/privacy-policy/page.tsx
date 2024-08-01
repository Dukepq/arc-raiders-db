export default function Page() {
  return (
    <main className="max-w-screen-xl mx-auto px-3">
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
            When you log in to the site we may collect some information from you
            such as your email address and username. You give us this
            information at your own volition. If you do not log in, non of your
            personal information will be collected by us.
          </p>
        </div>
        <div className="mt-2">
          <p>
            If you want to have your data removed from our database, you can do
            so by navigating to your profile and pressing the "remove account"
            button.
          </p>
        </div>

        <h2 className="text-2xl font-medium mb-2 mt-4">Use of Cookies</h2>
        <div>
          <p>
            To keep you logged in we need to keep track of your session. We do
            this through a cookie that stores a unique id associated with your
            session.
          </p>
        </div>
      </div>
    </main>
  );
}
