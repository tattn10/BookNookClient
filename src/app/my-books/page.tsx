import type { Metadata } from "next";
import MyBooksPage from "@/components/features/books/MyBooksPage";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage the books you have shared with BookNook.",
};

export default function MyBooksRoute() {
  return <MyBooksPage />;
}
