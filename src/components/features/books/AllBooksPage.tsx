import BookCard from "../home/BookCard";
import { books } from "./books";

export default function AllBooksPage() {
  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl flex-1 px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-9 border-b border-[var(--line)] pb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
          Take your time
        </p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          The bookshop
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
          Browse our shelf of handpicked classics and well-loved stories.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </main>
  );
}
