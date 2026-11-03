import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="paper-grain flex flex-1 items-center justify-center px-5 py-20">
      <section
        aria-labelledby="not-found-heading"
        className="w-full max-w-xl border border-[var(--line)] bg-[var(--paper)] px-7 py-12 text-center shadow-sm sm:px-12"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          404 · Page not found
        </p>
        <h1
          id="not-found-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          This page isn’t on our shelves.
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
          The page may have moved, or the address might be incorrect.
        </p>
        <Link
          href="/"
          className="focus-ring mt-7 inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
