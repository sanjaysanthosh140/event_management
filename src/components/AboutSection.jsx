import { useState } from "react";

const accordionItems = [
  {
    id: "01",
    title: "DESIGNED WITH INTENT",
    desc: "Every event we craft is built around your vision — thoughtfully designed from the first sketch to the final flourish. Beauty meets purpose in everything we do.",
  },
  {
    id: "02",
    title: "EXECUTED WITH PRECISION",
    desc: "Meticulous planning and composed execution ensure every detail unfolds exactly as envisioned. Clean. Controlled. Professional.",
  },
  {
    id: "03",
    title: "REMEMBERED WITH LOVE",
    desc: "We create moments that linger in memory long after the lights fade — because every celebration deserves to be unforgettable.",
  },
];

const stats = [
  { value: "200+", label: "PROJECTS DONE" },
  { value: "200+", label: "HAPPY CLIENTS" },
  { value: "10+",  label: "YEARS OF EXPERIENCE" },
  { value: "91%",  label: "POSITIVE FEEDBACK" },
];

export default function AboutSection() {
  const [openId, setOpenId] = useState("02");
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="about-section">
      {/* ── Top panel ── */}
      <div className="about-top">

        {/* Left: dual logo card */}
        <div className="about-logo-card">
          <img src="/q_logo.png" alt="Olam Wedding Planners logo" className="about-logo-img" />
          <div className="about-logo-divider" />
          <img src="/q_logo.png" alt="Olam Wedding Planners logo" className="about-logo-img" />
        </div>

        {/* Center: headline */}
        <div className="about-headline-panel">
          <span className="about-headline-tag">WHO WE ARE</span>
          <h2 className="about-headline">
            A Globally Experienced Wedding &amp; Event Management Company
          </h2>
          <p className="about-headline-sub">
            Olam Wedding Planners turns your most treasured milestones into living, breathing memories — crafted with artistry, delivered with grace.
          </p>
        </div>

        {/* Right: accordion */}
        <div className="about-accordion-panel">
          {accordionItems.map((item) => (
            <div
              key={item.id}
              className={`about-accordion-item${openId === item.id ? " about-accordion-item--open" : ""}`}
            >
              <button
                className="about-accordion-header"
                onClick={() => toggle(item.id)}
                aria-expanded={openId === item.id}
              >
                <span className="about-accordion-num">{item.id}</span>
                <span className="about-accordion-title">{item.title}</span>
                <span className="about-accordion-icon">{openId === item.id ? "−" : "+"}</span>
              </button>
              <div className="about-accordion-body">
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Stats bar ── */}
      <div className="about-stats">
        {stats.map((s, i) => (
          <div key={i} className="about-stat-item">
            <span className="about-stat-value">{s.value}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
