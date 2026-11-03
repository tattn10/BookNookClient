"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Sign-in is not connected yet. Please check back soon.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)] placeholder:text-[var(--ink-soft)]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="focus-ring rounded-sm text-sm text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)]"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
        />
      </div>

      <button
        type="submit"
        className="focus-ring mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[var(--accent)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
      >
        Login
      </button>

      <p aria-live="polite" className="min-h-5 text-center text-sm text-[var(--ink-soft)]">
        {message}
      </p>

      <p className="text-center text-sm text-[var(--ink-soft)]">
        New to BookNook?{" "}
        <Link
          href="/register"
          className="focus-ring rounded-sm text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)]"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
