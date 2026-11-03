import type { Metadata } from "next";
import AllBooksPage from "../../components/features/books/AllBooksPage";

export const metadata: Metadata = {
  title: "All Books",
  description: "Browse the handpicked collection at the BookNook.",
};

export default function BooksPage() {
  return <AllBooksPage />;
}
