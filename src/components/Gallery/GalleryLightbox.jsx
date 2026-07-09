import { memo, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

function GalleryLightbox({ items, currentIndex, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const current = items[currentIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (overlay && content) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(content, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNavigate]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchDeltaX.current > 60) onNavigate(-1);
    else if (touchDeltaX.current < -60) onNavigate(1);
  }, [onNavigate]);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (overlay && content) {
      gsap.to(content, { opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.in" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [onClose]);

  if (!current) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${current.title}`}
      onClick={handleClose}
    >
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
        aria-label="Close lightbox"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
        className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-luxury-accent hover:text-luxury-accent md:left-8"
        aria-label="Previous image"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
        className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-luxury-accent hover:text-luxury-accent md:right-8"
        aria-label="Next image"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="relative mx-4 flex max-h-[85vh] max-w-5xl flex-col items-center md:mx-8"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={current.image}
          alt={current.title}
          className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          draggable={false}
        />

        <div className="mt-6 text-center">
          <h3 className="font-display text-2xl text-white md:text-3xl">
            {current.title}
          </h3>
          <p className="mt-2 max-w-lg text-sm text-white/60">
            {current.description}
          </p>
          <p className="mt-3 text-xs tracking-[0.2em] text-white/30 tabular-nums">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(GalleryLightbox);
