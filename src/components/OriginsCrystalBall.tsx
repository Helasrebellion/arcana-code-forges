import React, { useMemo, useState } from "react";
import "./OriginsCrystalBall.css";

type OriginEntry = {
  id: string;
  org: string;
  title: string;
  timeframe: string;
  status: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  runes?: string[];
};

type Props = {
  sectionId?: string;
};

const REVEAL_THRESHOLD = 70;

const OriginsCrystalBall: React.FC<Props> = ({ sectionId = "origins" }) => {
  const entries: OriginEntry[] = useMemo(
    () => [
      {
        id: "gateway",
        org: "Gateway Community College",
        title: "The First Spark",
        timeframe: "AAS — Programming Track",
        status:
          "Graduated — Computer and Information Technology (AAS), Programming Track",
        description:
          "Where the fundamentals were forged. Structured problem solving, building with intent, and learning how systems fit together.",
        logoSrc: "/images/gatewayyy.png",
        logoAlt: "Gateway Community College logo",
        runes: [
          "Programming Foundations",
          "Systems Thinking",
          "Java",
          "HTML",
          "CSS",
          "Javascript",
          "PHP",
          "MYSQL",
          "Python",
          "Kotlin",
        ],
      },
      {
        id: "wgu",
        org: "Western Governors University",
        title: "The Deepening Study",
        timeframe: "Degree in progress",
        status: "Ongoing — ETA graduation: 2026",
        description:
          "An ongoing pursuit to sharpen theory and practice. Strengthening architecture instincts and expanding depth across modern software disciplines.",
        logoSrc: "/images/WGU.jpg",
        logoAlt: "Western Governors University logo",
        runes: [
          "Architecture",
          "C#",
          "JavaScript",
          "MYSQL",
          "Angular",
          "Project Management",
          "Python",
          "AWS",
          "Mobile Development",
        ],
      },
      {
        id: "codeyou",
        org: "Code:You",
        title: "Trial by Fire",
        timeframe: "Web Development Course",
        status: "Graduated — Mentoring entry-level students coming soon",
        description:
          "A fast-paced proving ground shipping real web projects, building confidence with modern tooling, and leveling up through iteration.",
        logoSrc: "/images/code_you_logo.jpg",
        logoAlt: "Code:You logo",
        runes: ["HTML", "CSS", "Javascript", "React", "APIs", "Git"],
      },
      {
        id: "redhawk",
        org: "Redhawk Technologies",
        title: "Tempered in the Forge",
        timeframe: "Professional experience",
        status:
          "Worked 1.5 years — numerous clients & tech stacks (details protected by NDA)",
        description:
          "Where craft meets reality. Collaboration, delivery, and adapting across stacks. The specifics are sealed, but the lessons endure.",
        logoSrc: "/images/redhawk-icon.png",
        logoAlt: "Redhawk Technologies logo",
        runes: [
          "Client Delivery",
          "Full-Stack Adaptability",
          "Team Collaboration",
          "Ionic Angular",
          "Ionic React",
          "SQL",
          "Supabase",
          "Wordpress",
          "Wix",
          "Figma",
          "NoSQL",
          "Laravel",
          "Typescript",
          "Mailchimp",
        ],
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isScrying, setIsScrying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [charge, setCharge] = useState(0);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  const current = entries[index];

  const resetScry = () => {
    setIsScrying(false);
    setRevealed(false);
    setCharge(0);
    setLastPoint(null);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % entries.length);
    resetScry();
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + entries.length) % entries.length);
    resetScry();
  };

  const setChargeAndMaybeReveal = (inc: number) => {
    setCharge((c) => {
      const nextCharge = Math.min(100, c + inc);
      if (nextCharge >= REVEAL_THRESHOLD) setRevealed(true);
      return nextCharge;
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture pointer so we keep receiving move events even if finger drifts a bit
    e.currentTarget.setPointerCapture?.(e.pointerId);

    setIsScrying(true);
    setLastPoint({ x: e.clientX, y: e.clientY });

    // Quick tap adds some charge so it never feels broken on touch
    setChargeAndMaybeReveal(18);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrying || !lastPoint) return;

    const dx = e.clientX - lastPoint.x;
    const dy = e.clientY - lastPoint.y;

    setLastPoint({ x: e.clientX, y: e.clientY });

    // Movement distance (touch friendly)
    const dist = Math.sqrt(dx * dx + dy * dy);
    const inc = Math.min(10, Math.max(1, dist / 2)); // 1..10

    setChargeAndMaybeReveal(inc);
  };

  const onPointerUp = () => {
    setIsScrying(false);
    setLastPoint(null);
  };

  // Tap/click: instantly reveal
  const onClickOrb = () => {
    setRevealed(true);
    setCharge(100);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setRevealed(true);
      setCharge(100);
    }
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section className="origins-section" id={sectionId}>
      <div className="origins-header">
        <h2 className="origins-title">Origins of the Forge</h2>
        <p className="origins-subtitle">
          Place your hand upon the crystal—stir the mist, and let a vision take
          form.
        </p>
      </div>

      <div className="origins-layout">
        {/* ===== LEFT: ORB ===== */}
        <div className="orb-panel">
          <div
            className={[
              "crystal-orb",
              isScrying ? "is-scrying" : "",
              revealed ? "is-revealed" : "",
            ].join(" ")}
            role="button"
            tabIndex={0}
            aria-label="Crystal ball: tap or hold and move to reveal"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onClick={onClickOrb}
            onKeyDown={onKeyDown}
          >
            {/* Visions */}
            <div className="orb-visions">
              <div className="orb-logo-wrap" aria-hidden="true">
                <img
                  className="orb-logo"
                  src={current.logoSrc}
                  alt={current.logoAlt}
                />
              </div>

              <div className="orb-vision-title">{current.title}</div>
              <div className="orb-vision-org">{current.org}</div>
              <div className="orb-vision-time">{current.timeframe}</div>
            </div>

            {/* Fog + swirl */}
            <div className="orb-fog" />
            <div className="orb-swirl" />

            {/* Charge ring */}
            <div className="orb-ring" aria-hidden="true">
              <div
                className="orb-ring-fill"
                style={{ transform: `rotate(${(charge / 100) * 360}deg)` }}
              />
            </div>

            <div className="orb-hint">
              {revealed ? "Vision revealed ✧" : "Tap, or hold + move to scry"}
            </div>
          </div>

          <div className="orb-controls">
            <button
              className="orb-btn"
              onClick={prev}
              aria-label="Previous origin"
            >
              ‹
            </button>

            <div className="orb-progress" aria-label="Current vision">
              <span className="orb-progress-label">Vision</span>
              <span className="orb-progress-value">
                {index + 1} / {entries.length}
              </span>
            </div>

            <button className="orb-btn" onClick={next} aria-label="Next origin">
              ›
            </button>
          </div>
        </div>

        {/* ===== RIGHT: DETAILS ===== */}
        <div
          className={["origin-details", revealed ? "is-visible" : ""].join(" ")}
        >
          <h3 className="origin-title">{current.org}</h3>

          <p className="origin-status">{current.status}</p>
          <p className="origin-desc">{current.description}</p>

          {current.runes?.length ? (
            <div className="origin-runes" aria-label="Runes learned">
              {current.runes.map((r) => (
                <span key={r} className="rune-chip">
                  {r}
                </span>
              ))}
            </div>
          ) : null}

          {!revealed ? (
            <p className="origin-locked">Scry the orb to reveal the details.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default OriginsCrystalBall;
