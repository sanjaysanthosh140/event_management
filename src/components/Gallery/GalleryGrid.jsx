import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GalleryCard from "./GalleryCard";
import GalleryFilter from "./GalleryFilter";
import LoadMore from "./LoadMore";
import EmptyState from "./EmptyState";

function GalleryGrid({
  category,
  items,
  visibleCount,
  activeFilter,
  onFilterChange,
  onLoadMore,
  onImageClick,
  onBack,
  visible,
  hasMore,
}) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (!visible || !gridRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    },
    { scope: sectionRef, dependencies: [visible, category.id] }
  );

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".gallery-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    },
    { scope: gridRef, dependencies: [activeFilter, visibleCount] }
  );

  const visibleItems = items.slice(0, visibleCount);

  return (
    <section
      ref={sectionRef}
      className={`bg-luxury-bg transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label={`${category.name} gallery`}
    >
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 md:pt-32">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-xs tracking-[0.15em] text-white/50 uppercase transition-colors hover:text-luxury-accent"
              aria-label="Return to categories"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M9 2L4 7L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Categories
            </button>

            <p className="text-xs tracking-[0.35em] text-luxury-accent uppercase">
              {category.name}
            </p>
            <h2 className="mt-2 font-display text-4xl font-medium text-white md:text-5xl">
              {category.tagline}
            </h2>
          </div>

          <GalleryFilter
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />
        </div>

        {visibleItems.length === 0 ? (
          <EmptyState onReturn={onBack} />
        ) : (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5"
            >
              {visibleItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  categoryName={category.name}
                  index={index}
                  onClick={() => onImageClick(index)}
                />
              ))}
            </div>

            {hasMore && (
              <LoadMore onClick={onLoadMore} remaining={items.length - visibleCount} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default memo(GalleryGrid);
