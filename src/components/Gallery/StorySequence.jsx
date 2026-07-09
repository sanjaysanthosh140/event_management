import { memo, useEffect } from "react";
import { useStorySequence } from "./useStorySequence";
import StoryOverlay from "./StoryOverlay";
import StoryLoader from "./StoryLoader";

function StorySequence({ category, onComplete, onBack, fadingOut = false }) {
  const slides = category.story;

  const {
    containerRef,
    pinRef,
    setImageRef,
    currentSlide,
    isLoading,
    isComplete,
    slideCount,
    reducedMotion,
  } = useStorySequence({
    slides,
    onComplete,
  });

  useEffect(() => {
    if (reducedMotion && !isComplete) {
      const timer = requestAnimationFrame(() => onComplete?.());
      return () => cancelAnimationFrame(timer);
    }
  }, [reducedMotion, isComplete, onComplete]);

  const activeSlide = slides[currentSlide];

  return (
    <section
      ref={containerRef}
      className={`relative bg-luxury-bg transition-opacity duration-700 ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label={`${category.name} story sequence`}
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {isLoading && <StoryLoader />}

        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              ref={setImageRef(index)}
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: index === 0 && !isLoading ? 1 : 0 }}
              draggable={false}
            />
          ))}
        </div>

        <StoryOverlay
          categoryName={category.name}
          slide={activeSlide}
          currentIndex={currentSlide}
          totalSlides={slideCount}
          visible={!isLoading}
        />

        <button
          type="button"
          onClick={onBack}
          className="absolute top-24 left-6 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs tracking-[0.15em] text-white/80 uppercase backdrop-blur-md transition-colors hover:border-luxury-accent/50 hover:text-luxury-accent md:top-28 md:left-10"
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
          Back
        </button>
      </div>

      {!isComplete && !reducedMotion && (
        <div className="flex h-[30vh] items-center justify-center">
          <p className="text-xs tracking-[0.3em] text-white/30 uppercase">
            Scroll to explore
          </p>
        </div>
      )}
    </section>
  );
}

export default memo(StorySequence);
