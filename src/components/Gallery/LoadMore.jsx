import { memo } from "react";

function LoadMore({ onClick, remaining }) {
  return (
    <div className="mt-16 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        className="group relative overflow-hidden rounded-full border border-luxury-accent/40 px-10 py-3.5 text-xs tracking-[0.2em] text-luxury-accent uppercase transition-all duration-300 hover:border-luxury-accent hover:bg-luxury-accent hover:text-luxury-bg"
        aria-label={`Load ${remaining} more images`}
      >
        <span className="relative z-10">Load More</span>
      </button>
      <p className="text-xs text-white/30">
        {remaining} more {remaining === 1 ? "image" : "images"}
      </p>
    </div>
  );
}

export default memo(LoadMore);
