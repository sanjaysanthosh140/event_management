import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function pickDistinctImages(images, count) {
  const pool = [...images];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export function pickRandomImage(images, excludeList = []) {
  const exclude = new Set(
    (Array.isArray(excludeList) ? excludeList : [excludeList]).filter(Boolean),
  );
  const pool = images.filter((img) => !exclude.has(img));
  const source = pool.length > 0 ? pool : images;
  return source[Math.floor(Math.random() * source.length)];
}

export default function AutoRandomImage({
  images,
  className = "",
  minInterval = 2800,
  maxInterval = 4500,
  initialImage,
  getNextImage,
}) {
  const startImage =
    initialImage || images[Math.floor(Math.random() * images.length)];
  // Keep both layers on the same start image until the first swap,
  // so we never "claim" a sibling-conflicting image while still hidden.
  const [layerA, setLayerA] = useState(startImage);
  const [layerB, setLayerB] = useState(startImage);
  const [showB, setShowB] = useState(false);
  const stateRef = useRef({ layerA, layerB, showB });
  const getNextRef = useRef(getNextImage);

  useEffect(() => {
    stateRef.current = { layerA, layerB, showB };
  }, [layerA, layerB, showB]);

  useEffect(() => {
    getNextRef.current = getNextImage;
  }, [getNextImage]);

  useEffect(() => {
    let timeoutId;

    const scheduleNext = () => {
      const delay = minInterval + Math.random() * (maxInterval - minInterval);
      timeoutId = setTimeout(() => {
        const { layerA: currentA, layerB: currentB, showB: showingB } =
          stateRef.current;
        const resolveNext = (current) =>
          getNextRef.current
            ? getNextRef.current(current)
            : pickRandomImage(images, current);

        if (showingB) {
          setLayerA(resolveNext(currentB));
          setShowB(false);
        } else {
          setLayerB(resolveNext(currentA));
          setShowB(true);
        }

        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [images, minInterval, maxInterval]);

  return (
    <div className={`services-auto-image ${className}`.trim()}>
      <motion.div
        className="services-auto-image__layer"
        style={{ backgroundImage: `url(${layerA})` }}
        animate={{ opacity: showB ? 0 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.div
        className="services-auto-image__layer"
        style={{ backgroundImage: `url(${layerB})` }}
        animate={{ opacity: showB ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </div>
  );
}
