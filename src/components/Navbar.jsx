import { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services", hasDropdown: true },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function MenuToggle({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-black transition-colors hover:bg-black/80"
    >
      {isOpen ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-white"
          aria-hidden="true"
        >
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <div className="flex flex-col gap-[6px]">
          <span className="block h-[2px] w-[18px] bg-white" />
          <span className="block h-[2px] w-[18px] bg-white" />
        </div>
      )}
    </button>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => setScrolled(self.scroll() > 80),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-out ${
          scrolled && !menuOpen
            ? "bg-luxury-bg/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Desktop layout — push nav links away from the right edge */}
        <div className="hidden h-20 w-full items-center justify-between pl-10 lg:flex">
          <Link to="/" className="group flex items-center">
            <img src="/q_logo.png" alt="Logo" className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <nav className="navbar-desktop-links flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-luxury-accent ${
                  location.pathname === link.path
                    ? "text-luxury-accent"
                    : "text-white/80"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="mt-px opacity-60"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 4L5 7L8 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile logo — fixed top-left */}
      <Link
        to="/"
        className={`fixed top-[18px] left-[18px] z-[60] lg:hidden flex items-center transition-opacity duration-300 ${
          menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <img src="/q_logo.png" alt="Logo" className="h-12 w-auto object-contain" />
      </Link>

      {/* Mobile toggle — fixed top-right, same position open & closed */}
      <div className="fixed top-[18px] right-[18px] z-[60] lg:hidden">
        <MenuToggle isOpen={menuOpen} onClick={toggleMenu} />
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[55] bg-luxury-bg lg:hidden"
          >
            <div className="flex h-full items-center px-8">
              <nav className="flex w-full flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`block py-1 text-4xl font-semibold tracking-[0.12em] uppercase transition-colors duration-300 hover:text-luxury-accent sm:text-5xl ${
                        location.pathname === link.path
                          ? "text-luxury-accent"
                          : "text-white/85"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);
