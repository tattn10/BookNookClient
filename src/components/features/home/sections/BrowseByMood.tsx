import Link from "next/link";

const shelves = [
  {
    title: "Timeless classics",
    description: "Beloved stories that always find their way back to us.",
    ornament: "I",
  },
  {
    title: "Garden daydreams",
    description: "Secret paths, wild roses, and adventures outdoors.",
    ornament: "II",
  },
  {
    title: "A little mystery",
    description: "Clever clues and one-more-chapter evenings.",
    ornament: "III",
  },
  {
    title: "Stories of home",
    description: "Warm-hearted characters and places to return to.",
    ornament: "IV",
  },
];

export default function BrowseByMood() {
  return (
    <section
      aria-labelledby="mood-heading"
      className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--olive)]">
          Follow a feeling
        </p>
        <h2
          id="mood-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          A shelf for every mood
        </h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {shelves.map((shelf) => (
          <li
            key={shelf.title}
            className="flex min-h-44 flex-col border border-[var(--line)] bg-[var(--paper)] p-5"
          >
            <span
              aria-hidden="true"
              className="font-display text-sm italic text-[var(--accent)]"
            >
              {shelf.ornament}
            </span>
            <h3 className="mt-4 font-display text-xl">{shelf.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
              {shelf.description}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/books"
        className="focus-ring mt-6 inline-flex rounded-sm font-display text-sm italic text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)]"
      >
        Wander through the whole bookshop →
      </Link>
    </section>
  );
}
