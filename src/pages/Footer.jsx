import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-content">
          {/* Column 1: Brand Info */}
          <div className="footer-column">
            <h3>Olam Wedding Planners</h3>
            <p>
              Creating extraordinary celebrations and unforgettable moments since 2015. Your vision is our passion, and your satisfaction is our guarantee.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram" className="social-icon"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#">Luxury Weddings</a></li>
              <li><a href="#">Corporate Events</a></li>
              <li><a href="#">Private Celebrations</a></li>
              <li><a href="#">Floral & Decor</a></li>
              <li><a href="#">Catering Services</a></li>
              <li><a href="#">Photography & Video</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Meet the Team</a></li>
              <li><a href="#">Client Reviews</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Get Quote</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Custom) */}
          <div className="footer-column">
            <h3>Contact Info</h3>
            
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <p style={{ margin: 0 }}><strong>ABHIRAJ. S</strong> (Founder)</p>
                <p style={{ margin: 0 }}>Alappuzha, Kerala</p>
                <p style={{ margin: 0, fontSize: '0.85em', color: '#888' }}>FSSAI: 21326158000730</p>
              </div>
            </div>

            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <div>
                <p style={{ margin: 0 }}>9074226502</p>
                <p style={{ margin: 0 }}>7025531594</p>
              </div>
            </div>

            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <p style={{ margin: 0 }}>olamweddingplanners@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Olam Wedding Planners. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a 
        href="tel:+919074226502" 
        className="call-float" 
        aria-label="Call us"
      >
        <FaPhoneAlt />
      </a>

      {/* Floating WhatsApp Icon on the LEFT side */}
      <a 
        href="https://wa.me/919074226502" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>
  );
};

export default Footer;