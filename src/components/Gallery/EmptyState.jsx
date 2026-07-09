import { memo } from "react";

function EmptyState({ onReturn }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-8 h-32 w-32">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-4 rounded-full border border-dashed border-luxury-accent/30" />
        <svg
          className="absolute inset-0 m-auto text-luxury-accent/60"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="14" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 28L14 20L20 26L28 18L34 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <h3 className="font-display text-2xl text-white">No images found</h3>
      <p className="mt-2 max-w-sm text-sm text-white/50">
        Try adjusting your filters or explore another category.
      </p>

      <button
        type="button"
        onClick={onReturn}
        className="mt-8 rounded-full border border-white/20 px-8 py-3 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-luxury-accent hover:text-luxury-accent"
      >
        Return to Categories
      </button>
    </div>
  );
}

export default memo(EmptyState);
