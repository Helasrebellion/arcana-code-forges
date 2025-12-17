import React, { useMemo, useState } from "react";
import "./OriginsCrystalBall.css";

/*
  OriginsCrystalBall component
  ---------------------------
  - Purpose: Visual storytelling widget that presents a sequence of "origins"
    (education, experience, achievements) in a playful crystal-ball UI.
  - Interaction model:
      * Pointer/touch drag accumulates "charge"; past a threshold the vision
        is revealed.
      * Tap/click instantly reveals.
      * Keyboard: Enter/Space reveals; Arrow keys navigate between entries.
  - Accessibility:
      * orb element is rendered as role="button" and is keyboard-focusable
      * visual state (is-scrying, is-revealed) is reflected with class names
        so screen readers and CSS can respond appropriately
*/

/**
 * Single origin entry describing an item in the timeline.
 * Separated into a type to keep the component strongly typed and explicit.
 */
type OriginEntry = {
  id: string;
  org: string;
  title: string;
  timeframe: string;
  status: string;
  description: string;
  logoSrc: string; // path to logo graphic displayed inside the orb
  logoAlt: string; // accessible alt text for the logo
  runes?: string[]; // optional short-list of learned technologies/skills
};

/**
 * Component props
 * - sectionId allows this section to be targeted by in-page navigation
 */
type Props = {
  sectionId?: string;
};

// How much charge is required before the orb reveals its vision; tuned for
// a satisfying touch/drag experience without being too sensitive.
const REVEAL_THRESHOLD = 70;

const OriginsCrystalBall: React.FC<Props> = ({ sectionId = "origins" }) => {
  /*
    The collection of origin entries is static in this build; useMemo is used
    to ensure the array reference is stable across renders. If entries ever
    become dynamic (loaded from an API), this logic can be updated to fetch
    asynchronously instead.
  */
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
        status: "Graduated — Web Dev I Web Dev II",
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

  /*
    Local component state:
    - index: which entry is currently selected
    - isScrying: whether the user is actively dragging/touching the orb
    - revealed: whether the current entry is revealed (post-threshold)
    - charge: numeric accumulation 0..100 used to compute reveal progress
    - lastPoint: last pointer coordinates, used to compute movement delta
  */
  const [index, setIndex] = useState(0);
  const [isScrying, setIsScrying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [charge, setCharge] = useState(0);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  // Convenience: the currently selected entry
  const current = entries[index];

  /*
    Reset the scrying interaction state. Called when navigating entries to
    ensure the new entry starts hidden and uncharged.
  */
  const resetScry = () => {
    setIsScrying(false);
    setRevealed(false);
    setCharge(0);
    setLastPoint(null);
  };

  // Advance to next entry (circular), and reset interaction state
  const next = () => {
    setIndex((prev) => (prev + 1) % entries.length);
    resetScry();
  };

  // Move to previous entry (circular), and reset interaction state
  const prev = () => {
    setIndex((prev) => (prev - 1 + entries.length) % entries.length);
    resetScry();
  };

  /*
    Increment the charge value and reveal if we cross the REVEAL_THRESHOLD.
    We clamp charge to 100 to keep the UI predictable. The increment is
    intentionally forgiving (smaller increments for subtle motion) so touch
    interactions feel smooth.
  */
  const setChargeAndMaybeReveal = (inc: number) => {
    setCharge((c) => {
      const nextCharge = Math.min(100, c + inc);
      if (nextCharge >= REVEAL_THRESHOLD) setRevealed(true);
      return nextCharge;
    });
  };

  /*
    Pointer handlers provide a touch-first interaction model:
    - onPointerDown captures the pointer and seeds initial state
    - onPointerMove accumulates movement distance to increase `charge`
    - onPointerUp cancels the scrying state

    Notes:
    - setPointerCapture keeps move events reliable even if the finger drifts
    - a small instant charge is applied on down so quick taps can still
      trigger a reveal with a couple of short gestures
  */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture pointer events for reliability across drags
    e.currentTarget.setPointerCapture?.(e.pointerId);

    setIsScrying(true);
    setLastPoint({ x: e.clientX, y: e.clientY });

    // Quick tap adds some charge — improves feel on touch devices
    setChargeAndMaybeReveal(18);
  };

  /*
    Track movement distance and convert it into a charge increment.
    We compute Euclidean distance from the previous point and map it to
    a range of 1..10 (to limit sudden big jumps on very quick swipes).
  */
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

  // End of pointer interaction
  const onPointerUp = () => {
    setIsScrying(false);
    setLastPoint(null);
  };

  /*
    Click/tap semantics: an explicit click reveals instantly (for keyboard
    users and quick interactions) by setting charge to 100 and revealed = true.
  */
  const onClickOrb = () => {
    setRevealed(true);
    setCharge(100);
  };

  /*
    Keyboard handling for accessibility:
    - Enter/Space reveal the orb (and prevent default scrolling space behavior)
    - ArrowRight / ArrowLeft allow quick navigation between entries
  */
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setRevealed(true);
      setCharge(100);
    }
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  /*
    Render:
    - Left: interactive orb (role=button, keyboard focusable)
    - Right: details panel showing the selected origin; visibility is
      controlled by `revealed` so users discover content via interaction
  */
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
              // class toggles drive CSS animations and visual affordances
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
            {/* Visions: decorative information that becomes visible as the orb
                is revealed. The logo inside is marked aria-hidden because the
                textual details are surfaced in the adjacent details panel. */}
            <div className="orb-visions">
              <div className="orb-logo-wrap" aria-hidden="true">
                <img
                  className="orb-logo"
                  src={current.logoSrc}
                  alt={current.logoAlt}
                />
              </div>

              {/* Titles and brief metadata shown inside the orb */}
              <div className="orb-vision-title">{current.title}</div>
              <div className="orb-vision-org">{current.org}</div>
              <div className="orb-vision-time">{current.timeframe}</div>
            </div>

            {/* Fog + swirl: purely visual layers */}
            <div className="orb-fog" />
            <div className="orb-swirl" />

            {/* Charge ring: visual representation of progress to reveal */}
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

          {/* Simple controls for navigating entries and showing progress */}
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
          {/* Visible, accessible title + metadata for the selected origin */}
          <h3 className="origin-title">{current.org}</h3>

          <p className="origin-status">{current.status}</p>
          <p className="origin-desc">{current.description}</p>

          {/* If runes are present, display them as chips */}
          {current.runes?.length ? (
            <div className="origin-runes" aria-label="Runes learned">
              {current.runes.map((r) => (
                <span key={r} className="rune-chip">
                  {r}
                </span>
              ))}
            </div>
          ) : null}

          {/* If the content hasn't been revealed, show a gentle prompt */}
          {!revealed ? (
            <p className="origin-locked">Scry the orb to reveal the details.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default OriginsCrystalBall;
