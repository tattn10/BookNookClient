"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const serverUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

type CreateBookResponse = {
  error?: string;
  message?: string;
};

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.info("Please log in to add a book.");
      router.replace(`/login?callbackUrl=${encodeURIComponent("/add-book")}`);
    }
  }, [isPending, router, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) {
      toast.error("Please log in before adding a book.");
      router.replace(`/login?callbackUrl=${encodeURIComponent("/add-book")}`);
      return;
    }

    const form = event.currentTarget;
    setIsSubmitting(true);
    const formEntries = Object.fromEntries(
      new FormData(form).entries(),
    );

    try {
      const response = await fetch(`${serverUrl}/books`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEntries),
      });
      const result = (await response.json()) as CreateBookResponse;

      if (!response.ok) {
        toast.error(result.error ?? "Could not add the book. Please try again.");
        return;
      }

      toast.success(result.message ?? "Book added successfully.");
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Adding a book failed:", error);
      toast.error("Could not add the book. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <p role="status" className="text-sm text-[var(--ink-soft)]">
          {isPending ? "Checking your login…" : "Redirecting to login…"}
        </p>
      </main>
    );
  }

  return (
    <main className="paper-grain flex flex-1 justify-center px-5 py-14 sm:px-8 sm:py-20">
      <section
        aria-labelledby="add-book-heading"
        className="h-fit w-full max-w-2xl border border-[var(--line)] bg-[var(--paper)] p-7 shadow-sm sm:p-10"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Grow the collection
        </p>
        <h1
          id="add-book-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          Add a book
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
          Share a book with the BookNook community.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          <div>
            <label htmlFor="bookTitle" className="mb-2 block text-sm font-medium">
              Book title
            </label>
            <input
              id="bookTitle"
              name="bookTitle"
              type="text"
              required
              maxLength={160}
              className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm"
              placeholder="The book’s title"
            />
          </div>

          <div>
            <label htmlFor="authorName" className="mb-2 block text-sm font-medium">
              Author name
            </label>
            <input
              id="authorName"
              name="authorName"
              type="text"
              required
              maxLength={120}
              className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm"
              placeholder="Author’s name"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm"
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Kids">Kids</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
              Book image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              maxLength={2048}
              className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm"
              placeholder="https://example.com/book-cover.jpg"
              aria-describedby="image-url-hint"
            />
            <p id="image-url-hint" className="mt-2 text-xs text-[var(--ink-soft)]">
              Paste a direct link to the book cover image.
            </p>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Short description
            </label>
            <textarea
              id="description"
              name="description"
              required
              maxLength={1000}
              rows={4}
              className="focus-ring w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm"
              placeholder="What should readers know about this book?"
            />
          </div>

          <div>
            <label htmlFor="userName" className="mb-2 block text-sm font-medium">
              Your name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={session.user.name ?? ""}
              readOnly
              required
              className="min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper-dark)] px-4 text-sm"
            />
          </div>

          <div>
            <label htmlFor="userEmail" className="mb-2 block text-sm font-medium">
              Your email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={session.user.email}
              readOnly
              required
              className="min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper-dark)] px-4 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[var(--accent)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Adding book…" : "Add Book"}
          </button>
        </form>
      </section>
    </main>
  );
}
