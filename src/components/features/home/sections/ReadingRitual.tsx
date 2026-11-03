const rituals = [
  {
    number: "01",
    title: "Find your quiet corner",
    description: "A favorite chair, a sunny windowsill, or a blanket fort.",
  },
  {
    number: "02",
    title: "Settle in with a good page",
    description: "No rush to finish. The best stories take the time they need.",
  },
  {
    number: "03",
    title: "Stay for one more chapter",
    description: "The kettle can wait. You are right where you should be.",
  },
];

export default function ReadingRitual() {
  return (
    <section
      aria-labelledby="ritual-heading"
      className="border-y border-[var(--line)] bg-[#eae2d3]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            A small invitation
          </p>
          <h2
            id="ritual-heading"
            className="font-display text-4xl tracking-tight sm:text-5xl"
          >
            The art of an unhurried afternoon
          </h2>
        </div>
        <ol className="grid gap-7 md:grid-cols-3 md:gap-10">
          {rituals.map((ritual) => (
            <li
              key={ritual.number}
              className="border-t border-[var(--line)] pt-4"
            >
              <span className="font-display text-sm italic text-[var(--olive)]">
                {ritual.number}
              </span>
              <h3 className="mt-3 font-display text-2xl">{ritual.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                {ritual.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
