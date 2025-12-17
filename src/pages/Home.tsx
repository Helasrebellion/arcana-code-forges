import React, { useState } from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import Footer from "../components/Footer";
import OriginsCrystalBall from "../components/OriginsCrystalBall";
import TarotCard from "../components/TarotCard";
import ImageCarousel from "../components/ImageCarousel";
import Nav from "../components/Nav";
import Spellbook from "../components/Spellbook";
import Hero from "../components/Hero";
import { tarotCards } from "../components/tarotData";
import "./Home.css";

/* ===========================================
                MAIN HOME PAGE
=========================================== */
const Home: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  // Detect scroll-to-bottom inside IonContent
  const handleScroll = (event: CustomEvent) => {
    const el = event.target as HTMLElement;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowFooter(atBottom);
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="hero-content"
        onIonScroll={handleScroll}
        scrollEvents={true}
      >
        <Nav />
        <Hero />

        {/* ================= SERVICES ================= */}
        <section className="services-section" id="services">
          <div className="services-header">
            <h2 className="services-title">The Codex of Services</h2>
            <p className="services-subtitle">
              Flip a card to reveal the kind of magic we can forge together.
            </p>
          </div>

          <div className="tarot-grid">
            {tarotCards.map((card) => (
              <TarotCard key={card.id} card={card} />
            ))}
          </div>

          {/* ================= TECH STACK (CAROUSEL) ================= */}
          <div className="services-carousel-wrapper" id="techstack">
            <h3 className="carousel-title">Runes of the Craft</h3>
            <ImageCarousel />
          </div>
        </section>

        {/* ================= ORIGINS OF THE FORGE ================= */}
        <OriginsCrystalBall sectionId="origins" />

        <Spellbook />

        {/* ================= FOOTER (ONLY AT BOTTOM) ================= */}
        {showFooter && <Footer />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
