import { memo } from "react";
import StoryTimeline from "./StoryTimeline";

function StoryOverlay({ categoryName, slide, currentIndex, totalSlides, visible }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto w-full max-w-5xl px-6 pb-16 md:px-12 md:pb-24 lg:pb-28">
        <p className="mb-3 text-xs tracking-[0.35em] text-luxury-accent uppercase">
          {categoryName}
        </p>

        <h2
          key={slide?.id}
          className="font-display text-4xl leading-tight font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {slide?.title}
        </h2>

        <p
          key={`${slide?.id}-desc`}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          {slide?.description}
        </p>

        <div className="mt-10 flex items-center justify-between gap-6">
          <StoryTimeline current={currentIndex} total={totalSlides} />

          <span className="text-sm tracking-[0.2em] text-white/50 tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")}
            <span className="mx-2 text-white/30">/</span>
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(StoryOverlay);
