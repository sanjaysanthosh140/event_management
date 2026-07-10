import React, { useState } from "react";

const slides = [
  {
    id: 1,
    image: "/wedding/wedding_1.jpg",
    name: "Grand Wedding",
    description: "A timeless celebration of love with elegant décor and unforgettable moments.",
  },
  {
    id: 2,
    image: "/wedding/wedding_6.jpg",
    name: "The Ceremony",
    description: "Every vow, every smile — crafted into a perfect once-in-a-lifetime ceremony.",
  },
  {
    id: 3,
    image: "/wedding/reception_1.jpg",
    name: "Reception Night",
    description: "Lavish receptions filled with music, laughter, and endless joy.",
  },
  {
    id: 4,
    image: "/wedding/party_2.jpg",
    name: "Celebration Party",
    description: "Dance the night away in a vibrant atmosphere crafted just for you.",
  },
  {
    id: 5,
    image: "/wedding/wedding_10.avif",
    name: "Moments",
    description: "Capturing the most precious moments that last a lifetime.",
  },
  {
    id: 6,
    image: "/wedding/party_4.jpeg",
    name: "Festive Gala",
    description: "Elegant gatherings that blend tradition with modern sophistication.",
  },
];

export default function Gallery() {
  const [items, setItems] = useState(slides);

  const handleNext = () => {
    setItems((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handlePrev = () => {
    setItems((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, prev.length - 1)];
    });
  };

  return (
    <section className="gl-page">
      <div className="gl-slide">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`gl-item gl-item--${index + 1}`}
            style={{ backgroundImage: `url('${item.image}')` }}
          >
            {index === 1 && (
              <div className="gl-content">
                <p className="gl-tag">LuxeEvents Gallery</p>
                <h2 className="gl-name">{item.name}</h2>
                <p className="gl-des">{item.description}</p>
                <button className="gl-btn">Explore More</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="gl-nav">
        <button className="gl-nav-btn" onClick={handlePrev} aria-label="Previous">
          &#9665;
        </button>
        <button className="gl-nav-btn" onClick={handleNext} aria-label="Next">
          &#9655;
        </button>
      </div>

      <div className="gl-counter">
        {slides.map((_, i) => (
          <span key={i} className={`gl-dot${i === 0 ? " gl-dot--active" : ""}`} />
        ))}
      </div>
    </section>
  );
}
