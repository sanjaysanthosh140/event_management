import { memo } from "react";

const filters = [
  { id: "all", label: "All" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
  { id: "indoor", label: "Indoor" },
  { id: "outdoor", label: "Outdoor" },
  { id: "traditional", label: "Traditional" },
  { id: "luxury", label: "Luxury" },
];

function GalleryFilter({ activeFilter, onFilterChange }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 md:gap-3"
      role="toolbar"
      aria-label="Gallery filters"
    >
      {filters.map((filter) => {
        const isActive =
          filter.id === "all"
            ? activeFilter === "all"
            : activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-xs tracking-[0.12em] uppercase transition-all duration-300 ${
              isActive
                ? "bg-luxury-accent text-luxury-bg"
                : "border border-white/15 text-white/60 hover:border-luxury-accent/40 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default memo(GalleryFilter);
