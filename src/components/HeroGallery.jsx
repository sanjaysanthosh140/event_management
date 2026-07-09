import { useState, useEffect, memo } from "react";
import { heroImages, columnConfig } from "../data/heroImages";

const GALLERY_GAP = "var(--spacing-gallery-gap)";
const GALLERY_PADDING = "var(--spacing-gallery-padding)";

const columnOffsets = ["pt-0", "pt-12", "pt-6", "pt-16", "pt-4"];

function useColumnCount() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 1024) setCount(3);
      else setCount(5);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function GalleryImage({ src, alt }) {
  return (
    <div className="group w-full shrink-0 overflow-hidden rounded-xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}

function ImageColumn({ images, config, index, offset }) {
  const animationClass =
    config.direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className={`relative h-full min-w-0 overflow-hidden ${offset}`}>
      <div
        className={`flex flex-col ${animationClass}`}
        style={{
          gap: GALLERY_GAP,
          animationDuration: `${config.duration}s`,
          animationDelay: `${config.delay}s`,
        }}
      >
        {[...images, ...images].map((src, i) => (
          <GalleryImage key={`${index}-${i}`} src={src} alt={`Event showcase ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

function HeroGallery() {
  const columnCount = useColumnCount();
  const visibleColumns = heroImages.slice(0, columnCount);
  const visibleConfig = columnConfig.slice(0, columnCount);

  return (
    <div
      className="absolute inset-0 grid h-full w-full"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gap: GALLERY_GAP,
        padding: GALLERY_PADDING,
      }}
      aria-hidden="true"
    >
      {visibleColumns.map((images, i) => (
        <ImageColumn
          key={i}
          images={images}
          config={visibleConfig[i]}
          index={i}
          offset={columnOffsets[i] ?? "pt-0"}
        />
      ))}
    </div>
  );
}

export default memo(HeroGallery);
