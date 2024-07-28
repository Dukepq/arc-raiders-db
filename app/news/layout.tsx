import Footer from "../_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-[calc(100vh-var(--nav-height))]">{children}</div>
      <Footer />
    </>
  );
}
