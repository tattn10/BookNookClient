"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message ?? "Could not log out. Please try again.");
        return;
      }

      toast.success("You’re logged out.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not log out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-6 sm:px-8"
      >
        <Link
          href="/"
          aria-label="BookNook home"
          className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-sm sm:gap-2.5"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            fill="none"
            className="size-8 text-[var(--accent)] sm:size-9"
          >
            <path
              d="M16 9.5c-3-2.1-7.3-2.8-11-1.6v16c3.7-1.2 8-.5 11 1.6m0-16c3-2.1 7.3-2.8 11-1.6v16c-3.7-1.2-8-.5-11 1.6m0-16v16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
            <path
              d="M11 12.5c1.7.2 3.2.8 5 1.9m5-1.9c-1.7.2-3.2.8-5 1.9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.3"
            />
          </svg>
          <span className="font-display text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.65rem]">
            BookNook
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-9">
          <Link
            href="/#new-arrivals"
            className="focus-ring hidden rounded-sm text-sm font-medium tracking-wide text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)] lg:inline-flex"
          >
            New arrivals
          </Link>
          <Link
            href="/#featured"
            className="focus-ring hidden rounded-sm text-sm font-medium tracking-wide text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)] lg:inline-flex"
          >
            The collection
          </Link>
          <Link
            href="/#about"
            className="focus-ring hidden rounded-sm text-sm font-medium tracking-wide text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)] lg:inline-flex"
          >
            Our story
          </Link>
          <Link
            href="/books"
            className="focus-ring hidden min-h-10 items-center justify-center rounded-sm border border-[var(--accent)] px-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)] lg:inline-flex lg:px-5"
          >
            Browse books
          </Link>
          {session ? (
            <details className="relative">
              <summary className="focus-ring flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-sm px-1 text-sm font-medium text-[var(--foreground)] marker:hidden">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={36}
                    height={36}
                    unoptimized
                    className="size-9 rounded-full border border-[var(--line)] object-cover"
                  />
                ) : (
                  <span className="flex size-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm text-[var(--paper)]">
                    {(session.user.name || session.user.email || "R")
                      .slice(0, 1)
                      .toUpperCase()}
                  </span>
                )}
                <span className="max-w-28 truncate sm:max-w-40">
                  {session.user.name || session.user.email}
                </span>
                <span aria-hidden="true" className="text-xs">▾</span>
              </summary>
              <div className="absolute right-0 top-full z-20 mt-2 w-52 border border-[var(--line)] bg-[var(--paper)] p-2 shadow-lg">
                <p className="truncate px-3 py-2 text-xs text-[var(--ink-soft)]">
                  {session.user.email}
                </p>
                <Link
                  href="/add-book"
                  className="focus-ring block rounded-sm px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--paper-dark)]"
                >
                  Add a book
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="focus-ring block w-full rounded-sm px-3 py-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--paper-dark)] disabled:opacity-60"
                >
                  {isSigningOut ? "Logging out…" : "Log out"}
                </button>
              </div>
            </details>
          ) : isPending ? (
            <span aria-hidden="true" className="size-10" />
          ) : (
            <>
              <Link
                href="/login"
                className="focus-ring inline-flex min-h-9 items-center justify-center rounded-sm bg-[var(--accent)] px-2 text-xs font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)] sm:min-h-10 sm:px-4 sm:text-sm md:px-5"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="focus-ring inline-flex min-h-9 items-center justify-center rounded-sm border border-[var(--accent)] px-2 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)] sm:min-h-10 sm:px-4 sm:text-sm md:px-5"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
