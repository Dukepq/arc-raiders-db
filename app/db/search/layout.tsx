import Navigation from "./_components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3">
      <div className="max-w-screen-xl mx-auto mt-4 grid md:grid-cols-1fr-3.5fr grid-cols-1 gap-4">
        <Navigation />
        {children}
      </div>
    </div>
  );
}
