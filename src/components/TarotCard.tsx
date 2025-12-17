import React, { useState } from "react";
import "./TarotCard.css";
/*
  TarotCard.tsx
  -------------
  A single flip-card representing one offered service. The front of the
  card contains textual information rendered as part of the image itself
  (so it must be made accessible through alt text, aria descriptions, or
  by providing an explicit accessible UI control).

  This file provides:
  - a typed `TarotCardData` shape for card inputs
  - keyboard & pointer interactions to flip the card
  - accessibility annotations (aria-label, aria-describedby)
  - a small "Read" affordance that uses the Web Speech API with a
    visual fallback when TTS is not available

  Rationale & accessibility considerations:
  - Images must always include meaningful `alt` text. The `altFront` is
    used both as the `img` alt and as the content read by assistive
    technologies.
  - `aria-describedby` points to an element with the same text, so
    screen-reader users receive the front text when the card receives
    focus (no need to flip it to access the information).
  - The card is focusable (role="button" + tabIndex="0") and supports
    Enter/Space activation for keyboard users.
  - The "Read" button is an explicit control for people who benefit from
    audible output.
*/


type TarotCardData = {
  id: string; // unique id used for accessible IDs & keys
  frontImg: string; // image file that shows the card front (contains readable text)
  backImg: string; // image file used for the back side
  altFront: string; // concise, descriptive text for the front image (important!)
  altBack: string; // alt text for the back image
};

type TarotCardProps = { card: TarotCardData };

const TarotCard: React.FC<TarotCardProps> = ({ card }) => {
  /*
    State:
      - flipped: visual flip state (controls transform & front/back visibility)
      - showDesc: used as a short visible fallback when speech synthesis
        isn't available or errors out
  */
  const [flipped, setFlipped] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  // Element id used for aria-describedby and aria-controls
  const descId = `${card.id}-desc`;

  /*
    readText(): Use the Web Speech API when available to read the card
    description aloud. If the API isn't available (or an error occurs),
    briefly show a visible textual fallback so users can still access the
    content.

    Note:
      - We call speechSynthesis.cancel() before speaking to avoid pipelining
        multiple utterances when users repeatedly press the button.
      - The visible fallback is intentionally transient to avoid polluting
        the layout; it remains long enough to be noticed (~4s).
  */
  const readText = () => {
    const text = card.altFront;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        // Optional: set voice, rate, pitch if needed
        window.speechSynthesis.speak(utter);
      } catch (err) {
        // On failure, fall back to visible text
        setShowDesc(true);
        setTimeout(() => setShowDesc(false), 4000);
      }
    } else {
      // No TTS available — show visible fallback
      setShowDesc(true);
      setTimeout(() => setShowDesc(false), 4000);
    }
  };

  /*
    Interaction & accessibility details:
      - Clicking toggles flip
      - Role and tabIndex ensure keyboard focus and interaction
      - onKeyDown supports Enter and Space per accessibility best practices
      - aria-label includes the content to hint at what flipping reveals
      - aria-describedby points to a hidden element with the front text so
        screen readers announce it when the card receives focus
  */
  return (
    <div className="tarot-container">
      <div
        className={`tarot-card ${flipped ? "is-flipped" : ""}`}
        onClick={() => setFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-label={`Flip tarot card: ${card.altFront}`}
        aria-describedby={descId}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((prev) => !prev);
        }}
      >
        {/* Back face (default) */}
        <div className="card-face card-back">
          <img src={card.backImg} alt={card.altBack} />
        </div>

        {/* Front face (contains readable content) */}
        <div className="card-face card-front">
          <img src={card.frontImg} alt={card.altFront} />
        </div>
      </div>

      {/* Small interaction hint for sighted users */}
      {/* <p className="tarot-hint">Tap or hover to flip</p> */}

      {/*
        Actions region:
          - Read button (explicit control) — keyboard accessible
          - Screen-reader-only description is present so assistive tech can
            consume the text without requiring the card to be flipped
          - Visual fallback is shown briefly when TTS isn't available
      */}
      <div className="tarot-actions">
        {/* <button
          type="button"
          className="tarot-read"
          onClick={readText}
          aria-label={`Read card text: ${card.altFront}`}
          aria-controls={descId}
        >
          🔊 Read
        </button> */}

        {/* Hidden element for screen readers */}
        <div id={descId} className="sr-only">
          {card.altFront}
        </div>

        {/* Visible fallback (briefly shown when TTS isn't available) */}
        {showDesc && <p className="tarot-description">{card.altFront}</p>}
      </div>
    </div>
  );
};

export default TarotCard;
