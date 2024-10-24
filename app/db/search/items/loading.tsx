import Spinner from "@/app/_components/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Spinner loading={true} />
    </div>
  );
}
