"use client";

import Link from "next/link";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "A neighborhood bookshop, online",
    title: "Stories worth staying in for.",
    description:
      "Pull up a chair and stay awhile. Find well-loved classics and thoughtful little discoveries.",
    accent: "book-cover-olive",
    note: "Good books. Unhurried days.",
  },
  {
    eyebrow: "A little something for your next chapter",
    title: "Meet your next old friend.",
    description:
      "From beloved first editions to fresh favorites, there's a story here with your name on it.",
    accent: "book-cover-rust",
    note: "Some stories feel like home.",
  },
  {
    eyebrow: "For curious minds and quiet afternoons",
    title: "Turn the first page.",
    description:
      "Settle in with a timeless classic, follow a new curiosity, and let the afternoon find its own pace.",
    accent: "book-cover-navy",
    note: "The best journeys begin in a book.",
  },
];

export default function HomeBanner() {
  return (
    <section
      aria-label="BookNook highlights"
      className="paper-grain border-b border-[var(--line)]"
    >
      <Swiper
        modules={[A11y, Keyboard, Navigation, Pagination]}
        keyboard={{ enabled: true, onlyInViewport: true }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="home-banner mx-auto w-full max-w-7xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="grid min-h-[34rem] items-center gap-8 px-12 py-14 sm:px-16 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-20 md:py-20">
              <div className="max-w-2xl">
                <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-[var(--accent)]"
                  />
                  {slide.eyebrow}
                </p>
                <h1 className="font-display text-5xl leading-[1.08] tracking-[-0.035em] text-[var(--foreground)] sm:text-6xl md:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-[var(--ink-soft)] sm:text-lg sm:leading-8">
                  {slide.description}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Link
                    href="/books"
                    className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[var(--accent)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
                  >
                    Browse Books
                    <span aria-hidden="true">→</span>
                  </Link>
                  <span className="font-display text-sm italic text-[var(--ink-soft)]">
                    {slide.note}
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="relative mx-auto flex h-64 w-full max-w-md items-center justify-center sm:h-72"
              >
                <div className="absolute h-52 w-52 rounded-full border border-[var(--line)] sm:h-60 sm:w-60" />
                <div className="absolute h-44 w-44 rounded-full border border-[var(--line)] sm:h-52 sm:w-52" />
                <div className="relative flex h-48 w-64 items-end justify-center sm:h-56 sm:w-80">
                  <div
                    className={`absolute bottom-1 left-[12%] h-10 w-[76%] rotate-[-5deg] rounded-[2px] border-y-4 border-[#d5c6a9] ${slide.accent} shadow-lg`}
                  />
                  <div className="absolute bottom-10 left-[17%] h-11 w-[68%] rotate-[4deg] rounded-[2px] border-y-4 border-[#d5c6a9] bg-[#783e35] shadow-lg" />
                  <div className="absolute bottom-[5.25rem] left-[23%] h-10 w-[56%] rotate-[-3deg] rounded-[2px] border-y-4 border-[#d5c6a9] bg-[#526575] shadow-lg" />
                  <div className="absolute bottom-[9.1rem] left-[30%] h-10 w-[47%] rotate-[5deg] rounded-[2px] border-y-4 border-[#d5c6a9] bg-[#a17e4b] shadow-lg" />
                  <p className="absolute -bottom-5 right-0 font-display text-sm italic text-[var(--ink-soft)]">
                    A little stack of stories.
                  </p>
                </div>
                <span className="absolute left-2 top-8 font-display text-3xl text-[var(--accent)]/70">
                  ✳
                </span>
                <span className="absolute right-4 top-10 font-display text-xl text-[var(--olive)]">
                  ✳
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
