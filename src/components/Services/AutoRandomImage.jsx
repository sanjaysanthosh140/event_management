import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function pickRandomImage(images, exclude) {
  if (images.length <= 1) return images[0];
  let next = exclude;
  while (next === exclude) {
    next = images[Math.floor(Math.random() * images.length)];
  }
  return next;
}

export default function AutoRandomImage({
  images,
  className = "",
  minInterval = 2800,
  maxInterval = 4500,
}) {
  const [layerA, setLayerA] = useState(
    () => images[Math.floor(Math.random() * images.length)],
  );
  const [layerB, setLayerB] = useState(() =>
    pickRandomImage(images, images[0]),
  );
  const [showB, setShowB] = useState(false);
  const stateRef = useRef({ layerA, layerB, showB });

  useEffect(() => {
    stateRef.current = { layerA, layerB, showB };
  }, [layerA, layerB, showB]);

  useEffect(() => {
    let timeoutId;

    const scheduleNext = () => {
      const delay = minInterval + Math.random() * (maxInterval - minInterval);
      timeoutId = setTimeout(() => {
        const { layerA: currentA, layerB: currentB, showB: showingB } =
          stateRef.current;

        if (showingB) {
          setLayerA(pickRandomImage(images, currentB));
          setShowB(false);
        } else {
          setLayerB(pickRandomImage(images, currentA));
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
