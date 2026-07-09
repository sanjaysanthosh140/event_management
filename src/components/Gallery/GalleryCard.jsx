import { memo } from "react";

function GalleryCard({ item, categoryName, onClick, index }) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className="gallery-card group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white/5 text-left shadow-lg shadow-black/20 focus-visible:ring-2 focus-visible:ring-luxury-accent focus-visible:outline-none"
      aria-label={`View ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute top-4 left-4">
        <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] tracking-[0.15em] text-luxury-accent uppercase backdrop-blur-sm">
          {categoryName}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
        <h3 className="font-display text-lg font-medium text-white md:text-xl">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/60">
          {item.description}
        </p>
      </div>
    </button>
  );
}

export default memo(GalleryCard);
