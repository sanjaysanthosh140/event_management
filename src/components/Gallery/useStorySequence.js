import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPreloader } from "./ImagePreloader";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useStorySequence({ slides, onComplete, onSlideChange }) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const imageRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef(null);
  const completedRef = useRef(false);
  const reducedMotion = useRef(prefersReducedMotion());

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, slides.length);
  }, [slides]);

  useEffect(() => {
    completedRef.current = false;
    setIsComplete(false);
    setCurrentSlide(0);
    setIsLoading(true);

    const sources = slides.map((slide) => slide.image);
    const preloader = createPreloader(sources);
    preloaderRef.current = preloader;

    const unsubscribe = preloader.subscribe((state) => {
      if (state.isReady) setIsLoading(false);
    });

    preloader.preloadPriority(0);

    return unsubscribe;
  }, [slides]);

  useGSAP(
    () => {
      if (isLoading || !pinRef.current || !containerRef.current) return;

      const images = imageRefs.current.filter(Boolean);
      if (images.length === 0) return;

      if (reducedMotion.current) {
        setIsLoading(false);
        setIsComplete(true);
        onComplete?.();
        return;
      }

      const slideCount = slides.length;
      const scrollDistance = slideCount * window.innerHeight;

      gsap.set(images, { opacity: 0, willChange: "opacity" });
      gsap.set(images[0], { opacity: 1 });

      const timeline = gsap.timeline({ defaults: { ease: "none" } });

      for (let i = 1; i < slideCount; i++) {
        timeline
          .to(images[i - 1], { opacity: 0, duration: 1 }, i - 1)
          .to(images[i], { opacity: 1, duration: 1 }, i - 1);
      }

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pinRef.current,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: timeline,
        onUpdate: (self) => {
          const index = Math.min(
            slideCount - 1,
            Math.floor(self.progress * slideCount)
          );

          setCurrentSlide((prev) => {
            if (prev !== index) {
              preloaderRef.current?.preloadPriority(index);
              onSlideChange?.(index);
            }
            return index;
          });
        },
        onLeave: () => {
          if (!completedRef.current) {
            completedRef.current = true;
            setIsComplete(true);
            onComplete?.();
          }
        },
      });

      return () => {
        trigger.kill();
        timeline.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [slides, isLoading],
    }
  );

  const setImageRef = (index) => (el) => {
    imageRefs.current[index] = el;
  };

  return {
    containerRef,
    pinRef,
    setImageRef,
    currentSlide,
    isLoading,
    isComplete,
    slideCount: slides.length,
    reducedMotion: reducedMotion.current,
  };
}
