"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await authClient.signUp.email({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        image: String(formData.get("photoUrl")),
        callbackURL: "/",
      });

      if (result.error) {
        setMessage(result.error.message ?? "Could not register. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Could not register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          placeholder="Your name"
        />
      </div>

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
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="photoUrl"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Photo URL
        </label>
        <input
          id="photoUrl"
          name="photoUrl"
          type="url"
          autoComplete="url"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          placeholder="https://example.com/your-photo.jpg"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          aria-describedby="password-hint"
        />
        <p
          id="password-hint"
          className="mt-2 text-xs text-[var(--ink-soft)]"
        >
          Use at least 8 characters.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[var(--accent)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
      >
        {isSubmitting ? "Creating account…" : "Register"}
      </button>

      <p
        aria-live="polite"
        className="min-h-5 text-center text-sm text-[var(--ink-soft)]"
      >
        {message}
      </p>

      <p className="text-center text-sm text-[var(--ink-soft)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="focus-ring rounded-sm text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)]"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
