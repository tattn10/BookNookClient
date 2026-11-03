import Link from "next/link";

export default function PasswordResetNotice() {
  return (
    <main className="paper-grain flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
      <section
        aria-labelledby="reset-heading"
        className="w-full max-w-lg border border-[var(--line)] bg-[var(--paper)] p-7 shadow-sm sm:p-10"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          A note from the bookseller
        </p>
        <h1
          id="reset-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          Password help
        </h1>
        <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
          Password recovery is not available yet. Please check back when
          BookNook sign-in is ready.
        </p>
        <Link
          href="/login"
          className="focus-ring mt-8 inline-flex min-h-11 items-center justify-center rounded-sm border border-[var(--accent)] px-5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)]"
        >
          Back to login
        </Link>
      </section>
    </main>
  );
}
