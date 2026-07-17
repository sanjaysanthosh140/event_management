import { Link } from "react-router-dom";
import AutoRandomImage from "./AutoRandomImage";
import { serviceImages } from "./serviceImages";
import { servicesData } from "./servicesData";
import "./Services.css";

const trioSlots = [
  { className: "services-trio-card services-trio-left" },
  { className: "services-trio-card services-trio-center services-trio-center-large" },
  { className: "services-trio-card services-trio-right" },
];

export default function Services() {
  return (
    <section className="p-90 hm-services">
      <div className="services-inner">
        <div className="header-sec">
          <div className="header-title">
            <h5>What We Do</h5>
            <h6>IS TAKING CARE OF EVERYTHING, SO YOU DON&apos;T HAVE TO</h6>
          </div>
          <Link to="/services" className="link">
            View All Services
          </Link>
        </div>

        <div className="services-scroll-gallery">
          <div className="services-trio-stage">
            {trioSlots.map((slot, index) => (
              <AutoRandomImage
                key={slot.className}
                images={serviceImages}
                className={slot.className}
                minInterval={2500 + index * 400}
                maxInterval={4200 + index * 500}
              />
            ))}
          </div>
        </div>

        <div className="services-preview-grid">
          {servicesData.slice(0, 4).map((service, index) => (
            <article key={service.id} className="services-preview-card">
              <span className="services-preview-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
