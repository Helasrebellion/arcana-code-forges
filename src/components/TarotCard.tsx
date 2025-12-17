import React, { useState } from "react";
import "./TarotCard.css";

type TarotCardData = {
  id: string;
  frontImg: string;
  backImg: string;
  altFront: string;
  altBack: string;
};

type TarotCardProps = { card: TarotCardData };

const TarotCard: React.FC<TarotCardProps> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="tarot-container">
      <div
        className={`tarot-card ${flipped ? "is-flipped" : ""}`}
        onClick={() => setFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-label="Flip tarot card"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((prev) => !prev);
        }}
      >
        <div className="card-face card-back">
          <img src={card.backImg} alt={card.altBack} />
        </div>
        <div className="card-face card-front">
          <img src={card.frontImg} alt={card.altFront} />
        </div>
      </div>

      <p className="tarot-hint">Tap or hover to flip</p>
    </div>
  );
};

export default TarotCard;
