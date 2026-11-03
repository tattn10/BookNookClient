import BookCard from "./BookCard";

const newArrivals = [
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    note: "A new arrival",
    category: "A classic",
    cover: "book-cover-umber",
  },
  {
    title: "Persuasion",
    author: "Jane Austen",
    note: "Fresh on the shelf",
    category: "A novel",
    cover: "book-cover-plum",
  },
  {
    title: "The Railway Children",
    author: "E. Nesbit",
    note: "A story to share",
    category: "A classic",
    cover: "book-cover-rust",
  },
  {
    title: "A Little Princess",
    author: "Frances Hodgson Burnett",
    note: "A reader favorite",
    category: "A novel",
    cover: "book-cover-olive",
  },
  {
    title: "The Call of the Wild",
    author: "Jack London",
    note: "Ready for an adventure",
    category: "A classic",
    cover: "book-cover-navy",
  },
  {
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    note: "Follow the yellow brick road",
    category: "A tale",
    cover: "book-cover-gold",
  },
];

export default function NewArrivals() {
  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      className="scroll-mt-8 border-y border-[var(--line)] bg-[#eee6d7]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[var(--line)] pb-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              Fresh from the bookseller
            </p>
            <h2
              id="new-arrivals-heading"
              className="font-display text-4xl tracking-tight sm:text-5xl"
            >
              New arrivals
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
            A few fresh finds for your next quiet afternoon.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
          {newArrivals.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
