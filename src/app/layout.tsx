import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "Find your next favorite book at BookNook.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <nav
            aria-label="Main navigation"
            className="mx-auto flex h-16 w-full max-w-7xl items-center px-6 sm:px-8"
          >
            <Link
              href="/"
              aria-label="BookNook home"
              className="inline-flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight text-zinc-900 outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-zinc-100"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-7 text-teal-600 dark:text-teal-400"
              >
                <path
                  d="M12 7.5c-2.1-1.6-5.3-2.2-8-1.5v12c2.7-.7 5.9-.1 8 1.5m0-12c2.1-1.6 5.3-2.2 8-1.5v12c-2.7-.7-5.9-.1-8 1.5m0-12v12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
              <span>BookNook</span>
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
