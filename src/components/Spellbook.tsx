import React from "react";
import { IonButton } from "@ionic/react";
import "./Spellbook.css";

/**
 * Spellbook component
 * -------------------
 * Purpose: Present a small curated portfolio of projects (videos + links)
 * Implementation notes:
 *  - Each project is a self-contained block with a heading, a video preview
 *    (with `poster` fallback), and a link to the project's repository.
 *  - Videos use `controls`, `playsInline`, and `muted` to favor mobile
 *    compatibility and to allow inline playback on iOS/Safari and many
 *    Android browsers.
 *  - `preload="metadata"` is used to avoid eager network usage while still
 *    enabling the browser to show video duration and offer a faster start
 *    when the user hits play.
 *
 * Accessibility notes (summary):
 *  - Videos include fallback text for browsers without the <video> element.
 *  - For better accessibility, consider adding:
 *      * <track kind="captions"> elements for any spoken audio in videos
 *      * descriptive text blocks (summary or highlights) for each project
 *        (useful for screen-reader users)
 *      * keyboard focus styles and logical tab order (IonButton helps here)
 *  - External links open in a new tab and use rel="noopener noreferrer"
 *    to improve security and prevent tab-napping.
 *
 * Future improvements / suggestions:
 *  - Lazy-load videos with an IntersectionObserver so they only initialize
 *    when near the viewport (saves bandwidth and improves performance).
 *  - Provide a plain-image fallback or `poster` for low-bandwidth users
 *    (already using `poster`; could expand to show posters until the user
 *     explicitly elects to load video).
 *  - Add aria-describedby attributes for more descriptive short summaries
 *    that are read by screen readers when landing on each project.
 */

const Spellbook: React.FC = () => {
  return (
    <section className="spellbook-section" id="portfolio">
      {/* HEADER: title + brief explanation — kept succinct and polite */}
      <div className="spellbook-header">
        <h2 className="spellbook-title">Our Spellbook of Creations</h2>
        <p className="spellbook-disclaimer">
          Please be aware that many of the enchanted creations we’ve forged
          remain hidden by powerful non-disclosure agreements (NDAs) with
          clients and employers. These represent but a glimpse of our collective
          craft. Know that we wield a deep well of experience from a wide array
          of undertakings, each forged with care and precision. If you wish to
          discuss the mysteries of our past work or have specific questions,
          feel free to summon us directly. Thank you for your understanding as
          we guard these arcane secrets.
        </p>
      </div>

      {/* GRID: Each child is a project entry. Kept intentionally simple
          so the markup is straightforward to test and maintain. */}
      <div className="spellbook-grid">
        {/* ===== PROJECT 1 ===== */}
        <div className="spellbook-item">
          {/* Project title: visible, semantic heading helps screen readers */}
          <h3 className="spellbook-project-title">
            Sylvia Mullins Development V1
          </h3>

          {/*
            Video wrapper: stores a <video> element with a poster and controls.
            Important attributes:
              - controls: allows keyboard users to play/pause/seek via native
                controls when available.
              - playsInline: requests inline playback on devices that support it
              - muted: many mobile browsers only allow autoplay when muted
              - preload="metadata": fetches only metadata (duration, poster),
                reducing data usage until play is requested.
              - poster: fallback thumbnail shown before playback begins.

            Keep the <source> child last as required by the element model.
            The fallback text provides a fallback for older browsers or
            user agents without video support.
          */}
          <div className="spellbook-video-wrapper">
            <video
              className="spellbook-video"
              controls
              playsInline
              muted
              preload="metadata"
              poster="./thumbnails/SMDV1Thumbnail.png"
            >
              <source src="./videos/project-one.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/*
            Link to source code. Using an anchor that wraps an Ionic button gives a
            clear clickable affordance that is keyboard-navigable and recognizable
            to assistive tech. rel="noopener noreferrer" + target="_blank"
            improves security for links opening in new tabs.
          */}
          <div className="spellbook-github-btn-wrapper">
            <a
              href="https://github.com/Helasrebellion/codeky2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonButton className="spellbook-github-btn" shape="round">
                View Source on GitHub
              </IonButton>
            </a>
          </div>
        </div>

        {/* ===== PROJECT 2 ===== */}
        <div className="spellbook-item">
          <h3 className="spellbook-project-title">
            Sylvia Mullins Development V2
          </h3>

          {/* Same video pattern as project 1 — consider extracting a small
              reusable <ProjectCard> component if project count grows. */}
          <div className="spellbook-video-wrapper">
            <video
              className="spellbook-video"
              controls
              playsInline
              muted
              preload="metadata"
              poster="./thumbnails/SMDV2Thumbnail.png"
            >
              <source src="./videos/project-two.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="spellbook-github-btn-wrapper">
            <a
              href="https://github.com/Helasrebellion/SMD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonButton className="spellbook-github-btn" shape="round">
                View Source on GitHub
              </IonButton>
            </a>
          </div>
        </div>

        {/* ===== PROJECT 3 ===== */}
        <div className="spellbook-item">
          <h3 className="spellbook-project-title">Interactive SVG World Map</h3>

          {/* This project demonstrates an interactive visualization; for such
              content consider providing a short textual summary that captures
              the interaction model (e.g., "Hover nodes to see country info"). */}
          <div className="spellbook-video-wrapper">
            <video
              className="spellbook-video"
              controls
              playsInline
              muted
              preload="metadata"
              poster="./thumbnails/worldmapthumbnail.png"
            >
              <source src="./videos/project-three.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="spellbook-github-btn-wrapper">
            <a
              href="https://github.com/Helasrebellion/interactivemap"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonButton className="spellbook-github-btn" shape="round">
                View Source on GitHub
              </IonButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spellbook;
