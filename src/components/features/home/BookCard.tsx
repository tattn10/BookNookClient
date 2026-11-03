import type { Book } from "../books/books";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group min-w-0">
      <div className="flex min-h-64 items-center justify-center rounded-sm border border-[var(--line)] bg-[#eee6d7] px-5 py-7 sm:min-h-72">
        <div
          aria-label={`${book.title} book cover`}
          className={`book-cover ${book.cover} flex aspect-[0.69] w-36 flex-col items-center justify-between px-4 py-8 text-center text-[#f6e8c9] transition-transform duration-300 group-hover:-translate-y-1 sm:w-40`}
        >
          <span className="font-display text-[0.58rem] uppercase tracking-[0.25em]">
            {book.category}
          </span>
          <span className="font-display text-xl leading-tight">{book.title}</span>
          <span className="font-display text-[0.65rem] tracking-[0.14em]">
            {book.author}
          </span>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-display text-xl leading-snug text-[var(--foreground)]">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">{book.author}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[var(--olive)]">
          {book.note}
        </p>
      </div>
    </article>
  );
}
