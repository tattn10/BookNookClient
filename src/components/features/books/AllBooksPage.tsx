"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { BookRecord } from "./book-types";

const serverUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

export default function AllBooksPage() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        const response = await fetch(`${serverUrl}/books`, {
          signal: controller.signal,
        });
        const result = (await response.json()) as BookRecord[] | { error?: string };

        if (!response.ok) {
          throw new Error(
            !Array.isArray(result) && result.error
              ? result.error
              : "Could not load books.",
          );
        }

        if (!Array.isArray(result)) {
          throw new Error("The books API returned an invalid response.");
        }

        setBooks(result);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Loading books failed:", error);
        toast.error(
          error instanceof Error ? error.message : "Could not load books.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void fetchBooks();
    return () => controller.abort();
  }, []);

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-9 border-b border-[var(--line)] pb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
          Take your time
        </p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          The bookshop
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
          Browse books shared by the BookNook community.
        </p>
      </header>

      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner label="Loading books…" />
        </div>
      ) : books.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--ink-soft)]">
          No books have been added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article key={book._id} className="group min-w-0">
              <div className="relative flex aspect-[0.78] items-center justify-center overflow-hidden rounded-sm border border-[var(--line)] bg-[#eee6d7]">
                <Image
                  src={book.imageUrl}
                  alt={`${book.title} book cover`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pt-4">
                <h2 className="mt-1 font-display text-xl leading-snug text-[var(--foreground)]">
                  {book.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{book.author}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--olive)]">
                  {book.category}
                </p>
                <Link
                  href={`/books/${encodeURIComponent(book._id)}`}
                  className="focus-ring mt-4 inline-flex min-h-10 items-center justify-center rounded-sm border border-[var(--accent)] px-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)]"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
