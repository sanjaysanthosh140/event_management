import { createPortal } from "react-dom";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function FloatingContact() {
  return createPortal(
    <>
      <a
        href="tel:+919074226502"
        className="call-float"
        aria-label="Call us"
      >
        <FaPhoneAlt />
      </a>
      <a
        href="https://wa.me/919074226502"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>,
    document.body,
  );
}
