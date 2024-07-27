import ItemFilters from "./_components/ItemFilters";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ItemFilters />
      {children}
    </div>
  );
}
