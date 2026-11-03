import { books } from "../books/books";
import BookCard from "./BookCard";
import HomeBanner from "./HomeBanner";

export default function HomePage() {
  return (
    <main>
      <HomeBanner />

      <section
        id="featured"
        aria-labelledby="featured-heading"
        className="mx-auto w-full max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[var(--line)] pb-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
              Handpicked for your shelf
            </p>
            <h2
              id="featured-heading"
              className="font-display text-4xl tracking-tight sm:text-5xl"
            >
              The well-loved shelf
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
            A few old friends we think you&apos;ll be glad to meet.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-8 border-y border-[var(--line)] bg-[#eae2d3]"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              A note from the bookseller
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl tracking-tight sm:text-4xl"
            >
              There&apos;s always room for one more.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
              BookNook is for the dog-eared pages, the borrowed recommendations,
              and the stories you carry with you long after the last chapter.
            </p>
          </div>
          <p className="font-display text-lg italic text-[var(--accent)]">
            Come in. We saved you a spot.
          </p>
        </div>
      </section>

    </main>
  );
}
