import React from 'react';
import './Gallery.css';

const galleryItems = [
  {
    id: 1,
    image: "/wedding/wedding_1.webp",
    name: "River Canyon",
    description: "Nature Photography"
  },
  {
    id: 2,
    image: "/wedding/wedding_2.webp",
    name: "Mountain Peak",
    description: "Expedition 2026"
  },
  {
    id: 3,
    image: "/wedding/wedding_3.webp",
    name: "Alpine Fog",
    description: "Winter Series"
  },
  {
    id: 4,
    image: "/wedding/wedding_4.webp",
    name: "Coastal Waves",
    description: "Ocean View"
  },
  {
    id: 5,
    image: "/wedding/wedding_5.webp",
    name: "Wilderness",
    description: "Wildlife Reserve"
  },
  {
    id: 6,
    image: "/wedding/wedding_6.webp",
    name: "Deep Forest",
    description: "Canopy Exploration"
  },
  {
    id: 7,
    image: "/wedding/wedding_7.webp",
    name: "Aurora",
    description: "Night Sky"
  },
  {
    id: 8,
    image: "/wedding/wedding_8.webp",
    name: "The Journey",
    description: "Urban Transit"
  },
  {
    id: 9,
    image: "/wedding/reception_1.webp",
    name: "Flight",
    description: "Aerial Photography"
  },
  {
    id: 10,
    image: "/wedding/party_1.webp",
    name: "Cozy Mornings",
    description: "Portrait Series"
  },
  {
    id: 11,
    image: "/wedding/party_2.webp",
    name: "Barren Lands",
    description: "Desert Textures"
  },
  {
    id: 12,
    image: "/wedding/party_3.webp",
    name: "Winter Solstice",
    description: "Fashion Editorial"
  },
  {
    id: 13,
    image: "/wedding/party_4.webp",
    name: "Undergrowth",
    description: "Macro Nature"
  },
  {
    id: 14,
    image: "/wedding/party_5.webp",
    name: "Concrete Oasis",
    description: "Cityscapes"
  }
];

export default function Gallery() {
  return (
    <main className="gallery-page-container">
      <div className="gallery-wrapper">
        <div className="hex-grid">
          {galleryItems.map((item) => (
            <div className="hex" tabIndex="0" role="button" key={item.id}>
              <div className="hex-shape">
                <img src={item.image} alt={item.name} />
                <div className="hex-caption">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
