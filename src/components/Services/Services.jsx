import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Services.css';
import { servicesData } from './servicesData';

const Services = () => {
  useEffect(() => {
    AOS.init({
      once: false, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <section className="p-90 hm-services">
      <div style={{ width: '100%', padding: '0 3%' }}>
        <div className="header-sec">
          <div className="header-title">
            <h5>What We Do</h5>
            <h6>IS TAKING CARE OF EVERYTHING, SO YOU DON'T HAVE TO</h6>
          </div>
          <a href="#" className="link">View All Services</a>
        </div>
        
        <div className="services-list">
          {servicesData.map((service, index) => {
            // "element1 (20s), element2 (16s), element3 (18s), element4 (20s) cycling through the 8 cards in order 2,3,4,1,2,3,4,1"
            const elements = ["element2", "element3", "element4", "element1"];
            const spinClass = elements[index % 4];

            return (
              <div 
                key={service.id} 
                className="box-item sticky" 
                style={{ backgroundImage: `url(${service.imageUrl})` }}
              >
                <div className="head" data-aos="fade-left" data-aos-duration="800">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {service.title}
                </div>
                
                <div className="description-sec">
                  <div className="content" data-aos="fade-left" data-aos-duration="800">
                    <div className="txt-sec">
                      <p>{service.description}</p>
                    </div>
                    <a href="#" className="more">View More</a>
                  </div>
                  <div className="img-sec" data-aos="fade-right" data-aos-duration="800">
                    <img src={service.elementImage} alt="decorative floating element" className={spinClass} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
