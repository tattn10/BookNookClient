import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-20">
      <LoadingSpinner label="Loading page…" />
    </main>
  );
}
