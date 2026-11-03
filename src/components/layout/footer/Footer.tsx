import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[var(--foreground)] text-[var(--paper)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_0.8fr_0.8fr] md:gap-12 md:py-14">
        <div>
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              fill="none"
              className="size-8 text-[#d3b77f]"
            >
              <path
                d="M16 9.5c-3-2.1-7.3-2.8-11-1.6v16c3.7-1.2 8-.5 11 1.6m0-16c3-2.1 7.3-2.8 11-1.6v16c-3.7-1.2-8-.5-11 1.6m0-16v16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
            <span className="font-display text-2xl font-semibold tracking-tight">
              BookNook
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#d3c7b5]">
            A neighborhood bookshop for curious minds, quiet afternoons, and
            stories worth keeping close.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg">Get in touch</h2>
          <address className="mt-4 not-italic">
            <a
              href="mailto:hello@booknook.example"
              className="focus-ring rounded-sm text-sm text-[#d3c7b5] transition-colors hover:text-white"
            >
              hello@booknook.example
            </a>
          </address>
          <Link
            href="/books"
            className="focus-ring mt-3 inline-flex rounded-sm text-sm text-[#d3c7b5] transition-colors hover:text-white"
          >
            Browse the bookshop
          </Link>
        </div>

        <div>
          <h2 className="font-display text-lg">Find us around</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-sm text-sm text-[#d3c7b5] transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.goodreads.com/"
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-sm text-sm text-[#d3c7b5] transition-colors hover:text-white"
              >
                Goodreads
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-8">
          <p className="text-xs tracking-wide text-[#d3c7b5]">
            © {new Date().getFullYear()} BookNook. Made for the love of a good
            story.
          </p>
        </div>
      </div>
    </footer>
  );
}
