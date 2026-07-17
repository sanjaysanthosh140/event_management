import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const services = [
  {
    src: "/wedding/wedding_1.jpg",
    title: "Wedding Planning",
    desc: "Complete celebration design, vendor coordination, and timeline management.",
  },
  {
    src: "/wedding/party_1.avif",
    title: "Private Parties",
    desc: "Immersive parties with polished styling, music, lighting, and flow.",
  },
  {
    src: "/wedding/reception_1.jpg",
    title: "Reception Design",
    desc: "Elegant guest experiences shaped around dining, decor, and atmosphere.",
  },
  {
    src: "/wedding/wedding_3.jpg",
    title: "Ceremony Styling",
    desc: "Mandaps, aisles, florals, and stage moments composed with intention.",
  },
  {
    src: "/wedding/party_3.jpg",
    title: "Corporate Events",
    desc: "Launches, annual meets, ajnd brand gatherings with seamless execution.",
  },
  {
    src: "/wedding/wedding_10.avif",
    title: "Destination Events",
    desc: "Travel-aware planning for multi-day celebrations and resort experiences.",
  },
  {
    src: "/wedding/party_5.jpg",
    title: "Entertainment",
    desc: "Artists, performances, DJs, anchors, and guest-engagement moments.",
  },
  {
    src: "/wedding/wedding_5.jpg",
    title: "Decor Production",
    desc: "Custom builds, floral installations, lighting, furniture, and styling.",
  },
  {
    src: "/wedding/party_7.jpg",
    title: "Birthday Events",
    desc: "Personal celebrations designed with playful detail and smooth hosting.",
  },
  {
    src: "/wedding/wedding_7.jpg",
    title: "Photography",
    desc: "Creative capture teams for candid, editorial, and cinematic memories.",
  },
  {
    src: "/wedding/party_8.jpg",
    title: "Catering Setup",
    desc: "Menu planning, service layout, and dining experiences guests remember.",
  },
  {
    src: "/wedding/wedding_11.jpg",
    title: "Guest Management",
    desc: "Invites, RSVPs, hospitality desks, travel support, and on-ground care.",
  },
];

const getRadius = () => {
  if (window.innerWidth <= 900) return 220;
  if (window.innerWidth <= 1200) return 310;
  return 400;
};

function ServicesModal({ item, onClose, onPrevious, onNext }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <div
      className="services-modal active"
      role="dialog"
      aria-modal="true"
      aria-label={`Service preview: ${item.title}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="services-close-btn"
        onClick={onClose}
        aria-label="Close service preview"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M2 2L16 16M16 2L2 16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className="services-nav-btn services-prev-btn"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous service"
      >
        &#10094;
      </button>

      <button
        type="button"
        className="services-nav-btn services-next-btn"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next service"
      >
        &#10095;
      </button>

      <div className="services-modal-content" onClick={(event) => event.stopPropagation()}>
        <img className="services-modal-image" src={item.src} alt={item.title} />
        <div className="services-modal-info">
          <div className="services-modal-title">{item.title}</div>
          <div className="services-modal-desc">{item.desc}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Services() {
  const pageRef = useRef(null);
  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(400);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  let activeServiceIndex = Math.round(-rotation / 30);
  if (activeServiceIndex < 0) activeServiceIndex = 0;
  if (activeServiceIndex > 11) activeServiceIndex = 11;

  const activeItem = currentIndex === null ? null : services[currentIndex];

  useEffect(() => {
    setRadius(getRadius());

    const handleScroll = () => {
      if (!pageRef.current) return;
      const rect = pageRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      
      let progress = 0;
      if (scrollableDistance > 0) {
        progress = -rect.top / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
      }
      
      setRotation(-330 * progress);
    };

    const handleResize = () => {
      setRadius(getRadius());
      setIsMobile(window.innerWidth <= 900);
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);

  const openModal = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setCurrentIndex((index) =>
      index === null ? services.length - 1 : (index - 1 + services.length) % services.length
    );
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex((index) => (index === null ? 0 : (index + 1) % services.length));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (currentIndex === null) return;

      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, currentIndex, showNext, showPrevious]);

  const wheelItems = useMemo(
    () =>
      services.map((item, index) => {
        const baseAngle = (360 * index) / services.length;
        const mobileOffset = isMobile ? 90 : 0;
        const angle = baseAngle + mobileOffset;
        const counterRotation = -(angle + rotation);
        const isHovered = hoveredIndex === index;
        const isActive = activeServiceIndex === index;

        return {
          ...item,
          angle,
          transform: `rotate(${angle}deg) translate(${radius}px) rotate(${counterRotation}deg)`,
          scale: isHovered ? 1.2 : 1,
          isHovered,
          isActive,
        };
      }),
    [activeServiceIndex, hoveredIndex, radius, rotation]
  );

  return (
    <main className="services-page" ref={pageRef}>
      <div className="services-container">
        <section className="services-wheel-section" aria-label="Service wheel gallery">
          <div className="services-wheel-container">
            <div className="services-wheel" ref={wheelRef}>
              {wheelItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`services-wheel-item${item.isActive ? " is-active" : ""}`}
                  style={{
                    backgroundImage: `url("${item.src}")`,
                    transform: item.transform,
                    scale: item.scale,
                    zIndex: item.isHovered || item.isActive ? 10 : "auto",
                    boxShadow: item.isHovered || item.isActive
                      ? "0 0 30px rgba(255, 215, 0, 0.8)"
                      : undefined,
                  }}
                  onClick={() => openModal(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  aria-label={`View ${item.title}`}
                >
                  <span className="services-item-content">
                    <span className="services-item-title">{item.title}</span>
                    <span className="services-item-desc">{item.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="services-content-section" aria-label="Our services">


          <div className="services-slider-window">
            <div 
              className="services-slider-track"
              style={{ transform: `translateY(-${activeServiceIndex * 50}vh)` }}
            >
              {services.map((service, index) => (
                <div key={service.title} className="services-slider-item">
                  <button
                    type="button"
                    className={`services-scroll-content-inner ${activeServiceIndex === index ? 'is-active' : ''}`}
                    onClick={() => openModal(index)}
                  >
                    <span className="services-content-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="services-content-title">{service.title}</span>
                    <span className="services-content-desc">{service.desc}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
        </section>
      </div>

      <div className="services-scroll-indicator" aria-hidden="true">
        scroll
      </div>

      {activeItem && (
        <ServicesModal
          item={activeItem}
          onClose={closeModal}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </main>
  );
}

export default Services;
