import React from 'react';
import './Gallery.css';

const galleryItems = [
  {
    id: 1,
    image: "/wedding/wedding_1.jpg",
    name: "River Canyon",
    description: "Nature Photography"
  },
  {
    id: 2,
    image: "/wedding/wedding_2.jpg",
    name: "Mountain Peak",
    description: "Expedition 2026"
  },
  {
    id: 3,
    image: "/wedding/wedding_3.jpg",
    name: "Alpine Fog",
    description: "Winter Series"
  },
  {
    id: 4,
    image: "/wedding/wedding_4.jpg",
    name: "Coastal Waves",
    description: "Ocean View"
  },
  {
    id: 5,
    image: "/wedding/wedding_5.jpg",
    name: "Wilderness",
    description: "Wildlife Reserve"
  },
  {
    id: 6,
    image: "/wedding/wedding_6.jpg",
    name: "Deep Forest",
    description: "Canopy Exploration"
  },
  {
    id: 7,
    image: "/wedding/wedding_7.jpg",
    name: "Aurora",
    description: "Night Sky"
  },
  {
    id: 8,
    image: "/wedding/wedding_8.jpg",
    name: "The Journey",
    description: "Urban Transit"
  },
  {
    id: 9,
    image: "/wedding/reception_1.jpg",
    name: "Flight",
    description: "Aerial Photography"
  },
  {
    id: 10,
    image: "/wedding/party_1.avif",
    name: "Cozy Mornings",
    description: "Portrait Series"
  },
  {
    id: 11,
    image: "/wedding/party_2.jpg",
    name: "Barren Lands",
    description: "Desert Textures"
  },
  {
    id: 12,
    image: "/wedding/party_3.jpg",
    name: "Winter Solstice",
    description: "Fashion Editorial"
  },
  {
    id: 13,
    image: "/wedding/party_4.jpeg",
    name: "Undergrowth",
    description: "Macro Nature"
  },
  {
    id: 14,
    image: "/wedding/party_5.jpg",
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
