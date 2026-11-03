"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";

type NewArrival = {
  title: string;
  author: string;
  note?: string;
  category?: string;
};

type ArrivalState =
  | { status: "loading" }
  | { status: "loaded"; books: NewArrival[] }
  | { status: "error" };

const coverStyles = [
  "book-cover-olive",
  "book-cover-rust",
  "book-cover-navy",
  "book-cover-plum",
  "book-cover-gold",
  "book-cover-umber",
];

function isNewArrival(value: unknown): value is NewArrival {
  if (typeof value !== "object" || value === null || !("title" in value) || !("author" in value)) {
    return false;
  }

  return (
    typeof value.title === "string" &&
    typeof value.author === "string" &&
    (!("note" in value) || typeof value.note === "string") &&
    (!("category" in value) || typeof value.category === "string")
  );
}

export default function NewArrivals() {
  const [arrivalState, setArrivalState] = useState<ArrivalState>({
    status: "loading",
  });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadNewArrivals() {
      setArrivalState({ status: "loading" });

      try {
        const apiUrl = (
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
        ).replace(/\/$/, "");
        const response = await fetch(`${apiUrl}/api/books/new-arrivals`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`New arrivals request failed (${response.status}).`);
        }

        const payload: unknown = await response.json();

        if (
          typeof payload !== "object" ||
          payload === null ||
          !("books" in payload) ||
          !Array.isArray(payload.books) ||
          !payload.books.every(isNewArrival)
        ) {
          throw new Error("The new arrivals response has an invalid format.");
        }

        setArrivalState({ status: "loaded", books: payload.books });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Could not load new arrivals:", error);
        setArrivalState({ status: "error" });
      }
    }

    void loadNewArrivals();

    return () => controller.abort();
  }, [retryCount]);

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      className="scroll-mt-8 border-y border-[var(--line)] bg-[#eee6d7]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[var(--line)] pb-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              Fresh from the bookseller
            </p>
            <h2
              id="new-arrivals-heading"
              className="font-display text-4xl tracking-tight sm:text-5xl"
            >
              New arrivals
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
            The six latest additions to our shelves.
          </p>
        </div>

        {arrivalState.status === "loading" && (
          <p role="status" className="py-12 text-center text-[var(--ink-soft)]">
            Gathering the latest books for you…
          </p>
        )}

        {arrivalState.status === "error" && (
          <div
            role="alert"
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <p className="text-sm text-[var(--accent)]">
              New arrivals are unavailable right now. Please check the server
              connection and try again.
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="focus-ring rounded-sm border border-[var(--accent)] px-4 py-2 text-sm text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)]"
            >
              Try again
            </button>
          </div>
        )}

        {arrivalState.status === "loaded" &&
          (arrivalState.books.length === 0 ? (
            <p className="py-12 text-center text-[var(--ink-soft)]">
              No new books have arrived just yet. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
              {arrivalState.books.map((book, index) => (
                <BookCard
                  key={`${book.title}-${book.author}-${index}`}
                  book={{
                    title: book.title,
                    author: book.author,
                    note: book.note ?? "Just arrived on the shelf",
                    category: book.category ?? "New arrival",
                    cover: coverStyles[index % coverStyles.length],
                  }}
                />
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
