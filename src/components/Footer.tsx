import React from "react";
import { IonIcon } from "@ionic/react";
import {
  callOutline,
  logoGithub,
  logoLinkedin,
  mailOutline,
} from "ionicons/icons";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="arcana-footer">
      {/* TOP ROW (3 columns) */}
      <div className="footer-top">
        {/* LEFT COLUMN — SOCIAL MEDIA */}
        <div className="footer-column footer-social">
          <h3 className="footer-title">Connect</h3>

          <div className="social-bar">
            <a
              href="https://github.com/helasrebellion"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <IonIcon icon={logoGithub} />
            </a>

            <a
              href="https://www.linkedin.com/in/sylviahela/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <IonIcon icon={logoLinkedin} />
            </a>

            <a
              href="mailto:sylviamullins@arcanacodeforges.com"
              className="social-icon"
            >
              <IonIcon icon={mailOutline} />
            </a>

            <a href="tel:+18593207049" className="social-icon">
              <IonIcon icon={callOutline} />
            </a>
          </div>
        </div>

        {/* CENTER COLUMN — LOGO */}
        <div className="footer-column footer-center">
          <img
            src="./images/ArcanaLogo.png"
            alt="Arcana Code Forges Logo"
            className="footer-logo"
          />
        </div>

        {/* RIGHT COLUMN — WGU BADGE */}
        <div className="footer-column footer-badge">
          <blockquote
            className="badgr-badge"
            style={{
              fontFamily: 'Helvetica, Roboto, "Segoe UI", Calibri, sans-serif',
              color: "white",
            }}
          >
            <a href="https://api.badgr.io/public/assertions/ZBip3n96R0S5IPKn_LoTXQ">
              <img
                width="120px"
                height="120px"
                src="https://api.badgr.io/public/assertions/ZBip3n96R0S5IPKn_LoTXQ/image"
                alt="WGU Badge"
              />
            </a>

            <p className="badgr-badge-name">
              WGU Certificate: Front-End Developer
            </p>

            <p className="badgr-badge-recipient">
              <strong>Awarded To:</strong>
              <span style={{ display: "block" }}>Sylvia H Mullins</span>
            </p>

            <script
              async
              src="https://wgu.badgr.com/assets/widgets.bundle.js"
            ></script>
          </blockquote>
        </div>
      </div>

      {/* BOTTOM ROW — COPYRIGHT */}
      <div className="footer-bottom">© {currentYear} Arcana Code Forges</div>
    </footer>
  );
};

export default Footer;
