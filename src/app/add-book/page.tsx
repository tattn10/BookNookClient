import type { Metadata } from "next";
import AddBookForm from "@/components/features/books/AddBookForm";

export const metadata: Metadata = {
  title: "Add a Book",
  description: "Add a new book to the BookNook collection.",
};

export default function AddBookPage() {
  return <AddBookForm />;
}
