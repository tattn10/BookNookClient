"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { BookRecord } from "./book-types";

const serverUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

type BookResponse = BookRecord | { error?: string };

export default function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<BookRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBook() {
      try {
        const response = await fetch(
          `${serverUrl}/books/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );
        const result = (await response.json()) as BookResponse;

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok || !("_id" in result)) {
          throw new Error(
            !("_id" in result) && result.error
              ? result.error
              : "Could not load book details.",
          );
        }

        setBook(result);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Loading book details failed:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load book details.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void fetchBook();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <p role="status" className="text-sm text-[var(--ink-soft)]">
          Loading book details…
        </p>
      </main>
    );
  }

  if (notFound || !book) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-20 text-center">
        <h1 className="font-display text-4xl">Book not found</h1>
        <p className="text-sm text-[var(--ink-soft)]">
          This book may have been removed or the link may be incorrect.
        </p>
        <Link
          href="/books"
          className="focus-ring inline-flex min-h-10 items-center justify-center rounded-sm border border-[var(--accent)] px-4 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)]"
        >
          Back to all books
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-1 flex-col px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/books"
        className="focus-ring mb-8 w-fit rounded-sm text-sm text-[var(--accent)] underline underline-offset-4"
      >
        Back to all books
      </Link>
      <article className="grid gap-8 border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm sm:p-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
        <div className="relative mx-auto aspect-[0.72] w-full max-w-sm overflow-hidden rounded-sm border border-[var(--line)] bg-[#eee6d7]">
          <Image
            src={book.imageUrl}
            alt={`${book.title} book cover`}
            fill
            unoptimized
            sizes="(max-width: 768px) 90vw, 35vw"
            className="object-cover"
          />
        </div>
        <div className="self-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
            {book.category}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-[var(--ink-soft)]">
            by {book.author}
          </p>
          <p className="mt-8 whitespace-pre-wrap text-sm leading-7 text-[var(--foreground)]">
            {book.description}
          </p>
          <p className="mt-8 border-t border-[var(--line)] pt-5 text-sm text-[var(--ink-soft)]">
            Shared by {book.userName}
          </p>
        </div>
      </article>
    </main>
  );
}
