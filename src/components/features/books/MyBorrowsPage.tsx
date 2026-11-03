"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import type { BorrowRecord } from "./book-types";

const serverUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

type ApiResponse = {
  error?: string;
  message?: string;
};

export default function MyBorrowsPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [borrows, setBorrows] = useState<BorrowRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (isSessionPending || session) {
      return;
    }

    toast.info("Please log in to view your borrowed books.");
    router.replace(`/login?callbackUrl=${encodeURIComponent("/my-borrows")}`);
  }, [isSessionPending, router, session]);

  useEffect(() => {
    if (isSessionPending || !session) {
      return;
    }

    const controller = new AbortController();
    fetch(
      `${serverUrl}/borrows?userEmail=${encodeURIComponent(session.user.email)}`,
      { credentials: "include", signal: controller.signal },
    )
      .then(async (response) => {
        const result = (await response.json()) as BorrowRecord[] | ApiResponse;
        if (!response.ok || !Array.isArray(result)) {
          throw new Error(
            !Array.isArray(result) && result.error
              ? result.error
              : "Could not load your borrowed books.",
          );
        }

        return result;
      })
      .then(setBorrows)
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Loading borrowed books failed:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load your borrowed books.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [isSessionPending, session]);

  async function handleReturn(borrow: BorrowRecord) {
    if (!session) {
      return;
    }

    setReturningId(borrow._id);
    try {
      const response = await fetch(
        `${serverUrl}/borrows/${encodeURIComponent(borrow._id)}?userEmail=${encodeURIComponent(session.user.email)}`,
        { method: "DELETE", credentials: "include" },
      );
      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        toast.error(result.error ?? "Could not return this book.");
        return;
      }

      setBorrows((currentBorrows) =>
        currentBorrows.filter((currentBorrow) => currentBorrow._id !== borrow._id),
      );
      toast.success(result.message ?? "Book returned successfully.");
    } catch (error) {
      console.error("Returning a book failed:", error);
      toast.error("Could not return this book. Please try again.");
    } finally {
      setReturningId(null);
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
                : "Loading borrowed books…"
          }
        />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <header className="mb-9 border-b border-[var(--line)] pb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
          Out on loan
        </p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          My borrows
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
          Keep track of your borrowed books and return dates.
        </p>
      </header>

      {borrows.length === 0 ? (
        <section className="border border-[var(--line)] bg-[var(--paper)] px-6 py-14 text-center">
          <h2 className="font-display text-2xl">No borrowed books</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Browse the collection to find your next read.
          </p>
          <Link
            href="/books"
            className="focus-ring mt-5 inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--accent)] px-4 text-sm font-medium text-[var(--paper)] hover:bg-[var(--accent-dark)]"
          >
            Browse books
          </Link>
        </section>
      ) : (
        <div className="overflow-x-auto border border-[var(--line)] bg-[var(--paper)]">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="border-b border-[var(--line)] bg-[var(--paper-dark)]">
              <tr className="text-xs uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                <th scope="col" className="px-5 py-4 font-medium">Image</th>
                <th scope="col" className="px-5 py-4 font-medium">Title</th>
                <th scope="col" className="px-5 py-4 font-medium">Borrow date</th>
                <th scope="col" className="px-5 py-4 font-medium">Return date</th>
                <th scope="col" className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td className="px-5 py-4">
                    <div className="relative size-16 overflow-hidden rounded-sm border border-[var(--line)] bg-[#eee6d7]">
                      <Image
                        src={borrow.bookImage}
                        alt={`${borrow.bookTitle} book cover`}
                        fill
                        unoptimized
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <th scope="row" className="px-5 py-4 font-display text-lg font-normal">
                    {borrow.bookTitle}
                  </th>
                  <td className="px-5 py-4 text-sm text-[var(--ink-soft)]">
                    {formatDate(borrow.borrowDate)}
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--ink-soft)]">
                    {formatDate(borrow.returnDate)}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => handleReturn(borrow)}
                      disabled={returningId !== null}
                      className="focus-ring inline-flex min-h-9 items-center justify-center rounded-sm border border-[var(--accent)] px-3 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {returningId === borrow._id ? "Returning…" : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}
