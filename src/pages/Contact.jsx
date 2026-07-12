import React, { useState } from 'react';
import './Contact.css';
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'Wedding',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    const phoneNumber = "917736201975"; // The owner's WhatsApp number
    const text = `Hello Olam wedding planners! 
I would like to inquire about an event.

*Name:* ${formData.name}
*Email:* ${formData.email}
*Event Type:* ${formData.eventType}
*Message:* ${formData.message}`;

    // Encode the text for the URL
    const encodedText = encodeURIComponent(text);
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <main className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Let's start planning your unforgettable event.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-panel">
          <h2>Contact Information</h2>
          <p className="info-desc">Reach out to us directly or fill out the form, and we will get back to you to discuss your vision.</p>
          
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>Alappuzha, Kerala</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+91 90742 26502</p>
              <p>+91 70255 31594</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>olamweddingplanners@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventType">Event Type</label>
              <select 
                id="eventType" 
                name="eventType" 
                value={formData.eventType} 
                onChange={handleChange}
              >
                <option value="Wedding">Luxury Wedding</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Private Party">Private Party</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="Tell us about your event..."
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              <FaWhatsapp className="btn-icon" /> Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;
