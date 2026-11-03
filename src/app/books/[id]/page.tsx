import type { Metadata } from "next";
import BookDetails from "@/components/features/books/BookDetails";

export const metadata: Metadata = {
  title: "Book Details",
  description: "Read more about a book shared with the BookNook community.",
};

export default async function BookDetailsPage({
  params,
}: PageProps<"/books/[id]">) {
  const { id } = await params;
  return <BookDetails id={id} />;
}
