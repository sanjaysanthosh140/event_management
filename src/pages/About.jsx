import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';
import about from'../../public/wedding/reception_1.webp'
const About = () => {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-header" data-aos="fade-down" data-aos-duration="1000">
          <h5>About Us</h5>
          <h6>OLAM WEDDING PLANNERS</h6>
        </div>
        
        <div className="about-content">
          <div className="about-image-container" data-aos="fade-right" data-aos-duration="1000">
            <img src={about} alt="Wedding Celebration" className="about-image" />
            <div className="about-experience">
              <span className="years">8+</span>
              <span className="text">Years of<br/>Experience</span>
            </div>
          </div>
          
          <div className="about-text-container" data-aos="fade-left" data-aos-duration="1000">
            <h2 className="about-title">Creating Extraordinary Celebrations Since 2015</h2>
            <p className="about-description">
              At Olam Wedding Planners, we believe that every event should be a masterpiece. Founded by Abhiraj S. in Alappuzha, Kerala, our journey began with a simple passion: to transform ordinary moments into unforgettable memories. 
            </p>
            <p className="about-description">
              Our dedicated team of professionals brings creativity, precision, and a personalized touch to every celebration. Whether it's a luxury wedding, a corporate gala, or an intimate private gathering, we take care of everything so you don't have to. Your vision is our canvas, and your satisfaction is our ultimate goal.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span className="feature-text">Luxury Weddings</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Corporate Events</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌺</span>
                <span className="feature-text">Floral & Decor</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📸</span>
                <span className="feature-text">Photography & Video</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
