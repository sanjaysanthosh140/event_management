import React from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop",
    name: "Scotland",
    description:
      "Experience the mystical Highlands under twilight skies and misty lochs.",
    link: "#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&auto=format&fit=crop",
    name: "Norway",
    description:
      "Chase the Northern Lights under star-lit skies along scenic fjord roads.",
    link: "#",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop",
    name: "New Zealand",
    description:
      "Wander dramatic, mist-laden mountain paths that feel straight out of a dream.",
    link: "#",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop",
    name: "Japan",
    description:
      "Discover serene mountain temples shrouded in dusk and ancient forest trails.",
    link: "#",
  },
];

function Gallery() {
  const [items, setItems] = React.useState(slides);

  const handleNext = () => {
    setItems((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handlePrev = () => {
    setItems((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
  };

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-slide">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item gallery-item-pos-${index + 1}`}
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <div className="gallery-content">
                <div className="gallery-name">{item.name}</div>
                <div className="gallery-des">{item.description}</div>
                <a
                  className="gallery-see-more"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.link}
                >
                  <button>See More</button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-button">
          <button className="gallery-prev" onClick={handlePrev}>
            &#9665;
          </button>
          <button className="gallery-next" onClick={handleNext}>
            &#9655;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
