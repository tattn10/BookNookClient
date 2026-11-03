"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import type { BookRecord } from "./book-types";

const serverUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

type ApiResponse = {
  error?: string;
  message?: string;
  book?: BookRecord;
};

export default function MyBooksPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<BookRecord | null>(null);
  const [deletingBook, setDeletingBook] = useState<BookRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isSessionPending || session) {
      return;
    }

    toast.info("Please log in to view your books.");
    router.replace(`/login?callbackUrl=${encodeURIComponent("/my-books")}`);
  }, [isSessionPending, router, session]);

  useEffect(() => {
    if (isSessionPending || !session) {
      return;
    }

    const controller = new AbortController();
    fetch(
      `${serverUrl}/books?userEmail=${encodeURIComponent(session.user.email)}`,
      { credentials: "include", signal: controller.signal },
    )
      .then(async (response) => {
        const result = (await response.json()) as BookRecord[] | ApiResponse;
        if (!response.ok || !Array.isArray(result)) {
          throw new Error(
            !Array.isArray(result) && result.error
              ? result.error
              : "Could not load your books.",
          );
        }

        return result;
      })
      .then(setBooks)
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Loading your books failed:", error);
        toast.error(
          error instanceof Error ? error.message : "Could not load your books.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [isSessionPending, session]);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingBook || !session) {
      return;
    }

    const formEntries = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    setIsSaving(true);

    try {
      const response = await fetch(
        `${serverUrl}/books/${encodeURIComponent(editingBook._id)}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formEntries,
            userEmail: session.user.email,
          }),
        },
      );
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.book) {
        toast.error(result.error ?? "Could not update this book.");
        return;
      }

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book._id === result.book?._id ? result.book! : book,
        ),
      );
      setEditingBook(null);
      toast.success(result.message ?? "Book updated successfully.");
    } catch (error) {
      console.error("Updating a book failed:", error);
      toast.error("Could not update this book. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingBook || !session) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${serverUrl}/books/${encodeURIComponent(deletingBook._id)}?userEmail=${encodeURIComponent(session.user.email)}`,
        { method: "DELETE", credentials: "include" },
      );
      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        toast.error(result.error ?? "Could not delete this book.");
        return;
      }

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== deletingBook._id),
      );
      setDeletingBook(null);
      toast.success(result.message ?? "Book deleted successfully.");
    } catch (error) {
      console.error("Deleting a book failed:", error);
      toast.error("Could not delete this book. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isSessionPending || !session || isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <LoadingSpinner
          label={
            isSessionPending
              ? "Checking your login…"
              : !session
                ? "Redirecting to login…"
                : "Loading your books…"
          }
        />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <header className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[var(--line)] pb-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
            Your shelf
          </p>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
            My books
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
            Manage the books you have shared with BookNook.
          </p>
        </div>
        <Link
          href="/add-book"
          className="focus-ring inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--accent)] px-4 text-sm font-medium text-[var(--paper)] hover:bg-[var(--accent-dark)]"
        >
          Add a book
        </Link>
      </header>

      {books.length === 0 ? (
        <section className="border border-[var(--line)] bg-[var(--paper)] px-6 py-14 text-center">
          <h2 className="font-display text-2xl">Your shelf is empty</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Add a book to see it here.
          </p>
        </section>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book._id}
              className="overflow-hidden border border-[var(--line)] bg-[var(--paper)] shadow-sm"
            >
              <Link
                href={`/books/${encodeURIComponent(book._id)}`}
                className="focus-ring block"
                aria-label={`View ${book.title}`}
              >
                <div className="relative aspect-[0.78] bg-[#eee6d7]">
                  <Image
                    src={book.imageUrl}
                    alt={`${book.title} book cover`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--olive)]">
                  {book.category}
                </p>
                <h2 className="mt-1 font-display text-2xl">{book.title}</h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{book.author}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--ink-soft)]">
                  {book.description}
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBook(book)}
                    className="focus-ring inline-flex min-h-10 flex-1 items-center justify-center rounded-sm border border-[var(--accent)] px-4 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingBook(book)}
                    className="focus-ring inline-flex min-h-10 flex-1 items-center justify-center rounded-sm border border-red-800 px-4 text-sm font-medium text-red-800 hover:bg-red-800 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editingBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/55 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSaving) {
              setEditingBook(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-book-title"
            className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl sm:p-8"
          >
            <h2 id="edit-book-title" className="font-display text-3xl">
              Edit book
            </h2>
            <form onSubmit={handleUpdate} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Book title
                <input
                  name="bookTitle"
                  required
                  maxLength={160}
                  defaultValue={editingBook.title}
                  className="focus-ring min-h-11 rounded-sm border border-[var(--line)] bg-[var(--paper)] px-3 font-normal"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Author name
                <input
                  name="authorName"
                  required
                  maxLength={120}
                  defaultValue={editingBook.author}
                  className="focus-ring min-h-11 rounded-sm border border-[var(--line)] bg-[var(--paper)] px-3 font-normal"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Category
                <select
                  name="category"
                  required
                  defaultValue={editingBook.category}
                  className="focus-ring min-h-11 rounded-sm border border-[var(--line)] bg-[var(--paper)] px-3 font-normal"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Book image URL
                <input
                  name="imageUrl"
                  type="url"
                  required
                  maxLength={2048}
                  defaultValue={editingBook.imageUrl}
                  className="focus-ring min-h-11 rounded-sm border border-[var(--line)] bg-[var(--paper)] px-3 font-normal"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Description
                <textarea
                  name="description"
                  required
                  maxLength={1000}
                  rows={4}
                  defaultValue={editingBook.description}
                  className="focus-ring rounded-sm border border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-normal"
                />
              </label>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setEditingBook(null)}
                  className="focus-ring min-h-10 rounded-sm border border-[var(--line)] px-4 text-sm hover:bg-[var(--paper-dark)] disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="focus-ring min-h-10 rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--paper)] hover:bg-[var(--accent-dark)] disabled:opacity-60"
                >
                  {isSaving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-book-title"
            aria-describedby="delete-book-description"
            className="w-full max-w-md border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl sm:p-8"
          >
            <h2 id="delete-book-title" className="font-display text-3xl">
              Delete this book?
            </h2>
            <p id="delete-book-description" className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
              “{deletingBook.title}” will be permanently removed from your books.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingBook(null)}
                className="focus-ring min-h-10 rounded-sm border border-[var(--line)] px-4 text-sm hover:bg-[var(--paper-dark)] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="focus-ring min-h-10 rounded-sm bg-red-800 px-4 text-sm font-medium text-white hover:bg-red-900 disabled:opacity-60"
              >
                {isDeleting ? "Deleting…" : "Delete book"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
