/*
  Footer.tsx
  ---------
  Purpose:
    - Provide site-wide footer with social links, a centered logo, a
      certification/badge, and a copyright line.

  Accessibility & security notes:
    - All actionable links are keyboard-focusable and use semantic anchors.
    - External links that open in a new tab include rel="noopener noreferrer"
      to prevent tab-napping and to improve security.
    - Icons are decorative affordances; the links themselves are accessible
      because they are anchors with recognizable focus states. If you want
      screen readers to announce the icon meaning, add an `aria-label` to the
      <a> elements (e.g. aria-label="GitHub — opens in new tab").

  Badge integration:
    - The WGU badge is embedded as a blockquote that includes an <img>
      and an async script provided by the badge issuer. The <script> tag
      is intentionally included to render any interactive widget supplied by
      the badge host. Keep an eye on third-party scripts for network
      performance/privacy implications.

  Notes about images & responsiveness:
    - The footer logo uses a fixed height to ensure consistent visual scale,
      and the badge image uses explicit width/height attributes to avoid
      layout shifts while the asset loads (good for CLS).

  Future enhancements (optional):
    - Add accessible aria-labels to social links (if the icon alone isn't
      sufficiently descriptive to your users)
    - Lazy-load third-party badge script or load it only when the footer
      becomes visible (IntersectionObserver) to avoid blocking critical
      rendering paths.
*/

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
  // Dynamically compute the current year to keep the copyright up-to-date
  // without manual edits each year.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="arcana-footer">
      {/* TOP ROW (3 columns) */}
      <div className="footer-top">
        {/* LEFT COLUMN — SOCIAL MEDIA */}
        <div className="footer-column footer-social">
          <h3 className="footer-title">Connect</h3>

          <div className="social-bar">
            {/*
              GitHub — opens in a new tab. `rel="noopener noreferrer"` is
              used to prevent potential tab-napping attacks and is a best
              practice for external links.
            */}
            <a
              href="https://github.com/helasrebellion"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub — opens in new tab"
            >
              <IonIcon icon={logoGithub} />
            </a>

            {/* LinkedIn — external profile; labelled for screen-reader clarity */}
            <a
              href="https://www.linkedin.com/in/sylviahela/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn — opens in new tab"
            >
              <IonIcon icon={logoLinkedin} />
            </a>

            {/* Mailto link — opening the user's default mail client */}
            <a
              href="mailto:sylviamullins@arcanacodeforges.com"
              className="social-icon"
              aria-label="Email Arcana Code Forges"
            >
              <IonIcon icon={mailOutline} />
            </a>

            {/* Telephone link — accessible and useful on mobile devices */}
            <a href="tel:+18593207049" className="social-icon" aria-label="Call Arcana Code Forges">
              <IonIcon icon={callOutline} />
            </a>
          </div>
        </div>

        {/* CENTER COLUMN — LOGO */}
        <div className="footer-column footer-center">
          {/*
            The logo acts as a visual anchor. Keep a descriptive alt attribute
            so assistive technologies announce the brand when navigating the
            footer. Using the image with an alt helps both accessibility and
            search-engine clarity.
          */}
          <img
            src="./images/ArcanaLogo.png"
            alt="Arcana Code Forges Logo"
            className="footer-logo"
          />
        </div>

        {/* RIGHT COLUMN — WGU BADGE */}
        <div className="footer-column footer-badge">
          {/*
            The badge block includes an anchor-wrapped image and an async
            third-party script. The image has width/height attributes to
            reduce layout shift. The script is intentionally loaded here to
            initialize any interactive badge behavior the provider supplies.

            If you are concerned about performance or privacy, consider
            lazy-loading the script or replacing it with a static image.
          */}
          <blockquote
            className="badgr-badge"
            style={{
              fontFamily: 'Helvetica, Roboto, "Segoe UI", Calibri, sans-serif',
              color: "white",
            }}
          >
            <a href="https://api.badgr.io/public/assertions/ZBip3n96R0S5IPKn_LoTXQ" aria-label="View WGU badge details">
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

            {/* Third-party script for badge widget — loaded async */}
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
