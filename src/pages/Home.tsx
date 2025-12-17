/* ==========================================================
   Home.tsx — Main page composition & documentation
   ==========================================================
   Purpose:
     - Compose the app's landing page by assembling smaller, focused
       components: `Nav`, `Hero`, the `Services` tarot grid (TarotCard),
       `ImageCarousel` (tech runes), `OriginsCrystalBall`, `Spellbook`,
       and a lazily-rendered `Footer`.

   Notes & guidance:
     - Keep Home as a thin composition layer: all interactive logic and
       accessibility are implemented within their respective components.
     - We conditionally render `Footer` only after the user scrolls near
       the bottom (to reduce initial render work). A more robust approach
       uses IntersectionObserver to reveal the footer when it becomes
       visible in the viewport (preferred for performance).
     - This file intentionally avoids business logic; keep additions here
       to page-level concerns (analytics, route anchors, feature flags).
   ==========================================================
*/

import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import Footer from "../components/Footer";
import OriginsCrystalBall from "../components/OriginsCrystalBall";
import TarotCard from "../components/TarotCard";
import ImageCarousel from "../components/ImageCarousel";
import Nav from "../components/Nav";
import Spellbook from "../components/Spellbook";
import Hero from "../components/Hero";
import { tarotCards } from "../components/tarotData";
import "./Home.css";

/* -----------------------------
   Page component
   ----------------------------- */
const Home: React.FC = () => {
  /*
    showFooter:
      - Tracks whether the user has scrolled near the bottom of the
        <IonContent>. We use this to lazily mount the `Footer` to avoid
        rendering heavier content until it's likely to be seen.
      - Suggestion: Replace scroll-based detection with IntersectionObserver
        for improved accuracy and performance (no continuous scroll events).
  */
  const [showFooter, setShowFooter] = useState(false);

  /*
    handleScroll:
      - Fired by Ionic's `onIonScroll` event. We compute whether the user
        is within ~50px of the bottom and toggle `showFooter`.
      - Keep this function small and efficient: avoid expensive layout
        reads or heavy work here. If you need to do more complex checks,
        debounce or move logic to an observer.
  */
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
      {/*
        IonContent is the scrolling container and acts as the page's
        main content region. We attach `onIonScroll` to drive the
        footer reveal behavior and set `scrollEvents` to enable the
        event emission.
      */}
      <IonContent
        fullscreen
        className="hero-content"
        onIonScroll={handleScroll}
        scrollEvents={true}
      >
        {/* ================= Navigation ================= */}
        {/* Nav is responsible for site-wide navigation and in-page
            anchors; keep it near the top so it participates in focus
            order predictably. */}
        <Nav />

        {/* ================= Hero ================= */}
        {/* Hero contains the video background, headline and CTA (ContactForm). */}
        <Hero />

        {/* ================= Services (Tarot Grid) ================= */}
        <section className="services-section" id="services">
          <div className="services-header">
            <h2 className="services-title">The Codex of Services</h2>

            {/* Keep the subtitle concise — avoid embedding essential info in
                background media since it may not autoplay for all users. */}
            <p className="services-subtitle">
              Flip a card to reveal the kind of magic we can forge together.
            </p>
          </div>

          {/*
            Tarot grid:
              - Each `TarotCard` is a small, focused component handling
                its own flip/accessibility and read-aloud affordances.
              - The grid maps a static `tarotCards` array imported from
                `components/tarotData`. If this list becomes dynamic, move
                to a fetched data model and handle loading states here.
          */}
          <div className="tarot-grid">
            {tarotCards.map((card) => (
              <TarotCard key={card.id} card={card} />
            ))}
          </div>

          {/* ================= Tech stack (carousel) ================= */}
          <div className="services-carousel-wrapper" id="techstack">
            <h3 className="carousel-title">Runes of the Craft</h3>
            {/* ImageCarousel auto-advances and exposes controls; it manages
                its own accessibility and interval lifecycle internally. */}
            <ImageCarousel />
          </div>
        </section>

        {/* ================= Origins of the Forge (interactive orb) ================= */}
        {/* OriginsCrystalBall is responsible for its pointer & keyboard
            interactions; it accepts a `sectionId` prop to anchor the
            section for in-page navigation. */}
        <OriginsCrystalBall sectionId="origins" />

        {/* ================= Portfolio Spellbook ================= */}
        <Spellbook />

        {/* ================= Footer (lazy mount) ================= */}
        {/* The footer is mounted only when the user nears the bottom of the
            content to reduce initial rendering work. For predictable
            behavior and better perf, consider swapping this pattern for
            IntersectionObserver that watches a small sentinel element near
            the bottom of the page. */}
        {showFooter && <Footer />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
