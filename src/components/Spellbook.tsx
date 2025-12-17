import React from "react";
import { IonButton } from "@ionic/react";
import "./Spellbook.css";

const Spellbook: React.FC = () => {
  return (
    <section className="spellbook-section" id="portfolio">
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

      <div className="spellbook-grid">
        {/* PROJECT 1 */}
        <div className="spellbook-item">
          <h3 className="spellbook-project-title">
            Sylvia Mullins Development V1
          </h3>

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

        {/* PROJECT 2 */}
        <div className="spellbook-item">
          <h3 className="spellbook-project-title">
            Sylvia Mullins Development V2
          </h3>
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

        {/* PROJECT 3 */}
        <div className="spellbook-item">
          <h3 className="spellbook-project-title">Interactive SVG World Map</h3>
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
