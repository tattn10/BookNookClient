"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message ?? "Could not log in. Please try again.");
        return;
      }

      toast.success("You’re logged in. Welcome back!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Could not log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        disabled={isSubmitting}
        className="focus-ring mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[var(--accent)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
      >
        {isSubmitting ? "Logging in…" : "Login"}
      </button>

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
