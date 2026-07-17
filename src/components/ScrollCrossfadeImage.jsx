import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const defaultPosition =
  "absolute left-[10%] top-[55%] w-[80%] md:left-[30%] md:top-[20%] md:w-[40%] lg:left-[30%] lg:top-[20%] lg:w-[40%]";

export default function ScrollCrossfadeImage({
  image1Src,
  image2Src,
  className = "",
  sectionClassName = "",
  parallaxRange = 150,
  fadeRange = [0, 1],
  scrollRef: externalScrollRef,
  aspectClass = "aspect-video",
  fixedSize = false,
  cover = false,
  roundedClass = "rounded-xl",
}) {
  const internalRef = useRef(null);
  const sectionRef = externalScrollRef ?? internalRef;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [fadeStart, fadeEnd] = fadeRange;
  const opacity1 = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    [1, 1, 0, 0],
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    [0, 0, 1, 1],
  );
  const y = useTransform(scrollYProgress, [0, 1], [0, -parallaxRange]);

  const positionClasses = externalScrollRef ? "" : defaultPosition;
  const bgSize = cover ? "cover" : "contain";

  const sizeClasses = fixedSize ? "" : `${aspectClass} h-auto`;

  const imageBlock = (
    <motion.div
      className={`${positionClasses} ${sizeClasses} shadow-2xl overflow-hidden cursor-pointer ${roundedClass} ${className}`.trim()}
      style={{ y, willChange: "transform" }}
    >
      <motion.div
        className="absolute inset-0 z-[1] bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image1Src})`,
          backgroundSize: bgSize,
          backgroundPosition: "center",
          opacity: opacity1,
        }}
      />
      <motion.div
        className="absolute inset-0 z-[2] bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image2Src})`,
          backgroundSize: bgSize,
          backgroundPosition: "center",
          opacity: opacity2,
        }}
      />
    </motion.div>
  );

  if (externalScrollRef) {
    return imageBlock;
  }

  return (
    <section
      ref={internalRef}
      className={`relative w-full min-h-[150vh] ${sectionClassName}`.trim()}
    >
      {imageBlock}
    </section>
  );
}
