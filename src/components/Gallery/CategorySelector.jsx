import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function CategoryCard({ category, index, onSelect }) {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const enter = () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(card.querySelector("[data-overlay]"), {
          opacity: 0.65,
          duration: 0.5,
        });
        gsap.to(card.querySelector("[data-image]"), {
          scale: 1.08,
          duration: 0.7,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(card.querySelector("[data-overlay]"), {
          opacity: 0.85,
          duration: 0.5,
        });
        gsap.to(card.querySelector("[data-image]"), {
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    },
    { scope: cardRef }
  );

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(category)}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl text-left shadow-lg shadow-black/30 focus-visible:ring-2 focus-visible:ring-luxury-accent focus-visible:outline-none"
      aria-label={`Explore ${category.name} gallery`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <img
        data-image
        src={category.coverImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <div
        data-overlay
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-85 transition-opacity"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <span className="mb-2 text-[10px] tracking-[0.35em] text-luxury-accent uppercase">
          Collection
        </span>
        <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
          {category.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/60">
          {category.tagline}
        </p>
      </div>
    </button>
  );
}

function CategorySelector({ categories, onSelect, visible }) {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (!visible || !gridRef.current) return;

      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    },
    { scope: gridRef, dependencies: [visible] }
  );

  return (
    <section
      className={`transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Gallery categories"
    >
      <header className="mx-auto max-w-4xl px-6 pt-32 pb-16 text-center md:pt-40 md:pb-20">
        <h1 className="font-display text-5xl font-medium tracking-tight text-white md:text-7xl">
          Gallery
        </h1>
        <p className="mt-4 text-base tracking-wide text-white/50 md:text-lg">
          Explore our unforgettable celebrations.
        </p>
      </header>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(CategorySelector);
