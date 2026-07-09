import { memo } from "react";

function StoryTimeline({ current, total }) {
  return (
    <div
      className="flex items-center gap-2"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Slide ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
            i === current
              ? "w-10 bg-luxury-accent"
              : i < current
                ? "w-6 bg-luxury-accent/50"
                : "w-6 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default memo(StoryTimeline);
