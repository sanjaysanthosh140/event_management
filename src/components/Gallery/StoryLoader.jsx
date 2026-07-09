import { memo } from "react";

function StoryLoader({ progress }) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-luxury-bg"
      role="status"
      aria-live="polite"
      aria-label="Loading story images"
    >
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-luxury-accent"
          style={{ animationDuration: "1.2s" }}
        />
      </div>
      <p className="mt-6 font-display text-lg tracking-wide text-white/70">
        Preparing your experience
      </p>
      {progress > 0 && (
        <p className="mt-2 text-xs tracking-[0.2em] text-luxury-accent uppercase">
          {Math.round(progress * 100)}%
        </p>
      )}
    </div>
  );
}

export default memo(StoryLoader);
