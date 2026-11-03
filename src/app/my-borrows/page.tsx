import type { Metadata } from "next";
import MyBorrowsPage from "@/components/features/books/MyBorrowsPage";

export const metadata: Metadata = {
  title: "My Borrows",
  description: "View and return books you have borrowed from BookNook.",
};

export default function MyBorrowsRoute() {
  return <MyBorrowsPage />;
}
