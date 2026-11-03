"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

function getCallbackURL() {
  const searchParams = new URLSearchParams(window.location.search);
  const requestedURL =
    searchParams.get("callbackUrl") ?? searchParams.get("callbackURL");

  if (!requestedURL) {
    return "/";
  }

  try {
    const destination = new URL(requestedURL, window.location.origin);
    if (destination.origin !== window.location.origin) {
      return "/";
    }

    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return "/";
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("error")) {
      return;
    }

    toast.error("Could not log in with Google. Please try again.");
    url.searchParams.delete("error");
    url.searchParams.delete("error_description");
    window.history.replaceState(null, "", url);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const callbackURL = getCallbackURL();

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Could not log in. Please try again.");
        return;
      }

      toast.success("You’re logged in. Welcome back!");
      router.push(callbackURL);
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Could not log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: getCallbackURL(),
        errorCallbackURL: "/login?error=google_login_failed",
      });

      if (result.error) {
        toast.error(result.error.message ?? "Could not log in with Google.");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Could not log in with Google. Please try again.");
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

      <div className="flex items-center gap-4 text-xs text-[var(--ink-soft)]">
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span>or continue with</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
        className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-[var(--line)] bg-[var(--paper)] px-6 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Connecting…" : "Continue with Google"}
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
