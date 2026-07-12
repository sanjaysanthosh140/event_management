import React from 'react';
import './Gallery.css';

const galleryItems = [
  {
    id: 1,
    image: "https://picsum.photos/id/1015/400/400",
    name: "River Canyon",
    description: "Nature Photography"
  },
  {
    id: 2,
    image: "https://picsum.photos/id/1016/400/400",
    name: "Mountain Peak",
    description: "Expedition 2026"
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1018/400/400",
    name: "Alpine Fog",
    description: "Winter Series"
  },
  {
    id: 4,
    image: "https://picsum.photos/id/1019/400/400",
    name: "Coastal Waves",
    description: "Ocean View"
  },
  {
    id: 5,
    image: "https://picsum.photos/id/1020/400/400",
    name: "Wilderness",
    description: "Wildlife Reserve"
  },
  {
    id: 6,
    image: "https://picsum.photos/id/1021/400/400",
    name: "Deep Forest",
    description: "Canopy Exploration"
  },
  {
    id: 7,
    image: "https://picsum.photos/id/1022/400/400",
    name: "Aurora",
    description: "Night Sky"
  },
  {
    id: 8,
    image: "https://picsum.photos/id/1023/400/400",
    name: "The Journey",
    description: "Urban Transit"
  },
  {
    id: 9,
    image: "https://picsum.photos/id/1024/400/400",
    name: "Flight",
    description: "Aerial Photography"
  },
  {
    id: 10,
    image: "https://picsum.photos/id/1025/400/400",
    name: "Cozy Mornings",
    description: "Portrait Series"
  },
  {
    id: 11,
    image: "https://picsum.photos/id/1026/400/400",
    name: "Barren Lands",
    description: "Desert Textures"
  },
  {
    id: 12,
    image: "https://picsum.photos/id/1027/400/400",
    name: "Winter Solstice",
    description: "Fashion Editorial"
  },
  {
    id: 13,
    image: "https://picsum.photos/id/1028/400/400",
    name: "Undergrowth",
    description: "Macro Nature"
  },
  {
    id: 14,
    image: "https://picsum.photos/id/1029/400/400",
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
