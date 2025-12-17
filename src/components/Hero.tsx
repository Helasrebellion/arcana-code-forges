/*
  Hero.tsx
  --------
  Purpose:
    - Renders the full-screen hero section with a video background, an
      overlay for contrast, headline text, and a call-to-action (ContactForm).

  Important implementation notes (video):
    - `autoPlay` + `muted` + `loop` + `playsInline` is a common combination
      for decorative background videos. `muted` is particularly important
      because many browsers only allow autoplay without user interaction
      when media is muted.

    - Mobile autoplay may still fail intermittently due to browser policies,
      data-saver or battery-saver settings, or heuristics on some devices.
      In production you may want to implement a small progressive enhancement
      that attempts `video.play()` programmatically and falls back to starting
      playback on first user interaction (touchstart / click). This is a
      pragmatic approach to recover from autoplay blocks.

    - `playsInline` helps iOS Safari avoid forcing full-screen playback when
      the video starts; this preserves the hero layout and overlay.

  Accessibility guidance:
    - If the video is purely decorative (background), it should be hidden
      from assistive technologies: add `aria-hidden="true"` to the element.
      This prevents screen readers from announcing the video and focuses
      them on the textual content which is typically the primary message.

    - Respect `prefers-reduced-motion`: users who request reduced motion
      should not receive forced autoplaying video. Detect with
      `window.matchMedia('(prefers-reduced-motion: reduce)')` and show a
      static poster or background instead.

  Performance suggestions:
    - Use a `poster` image for a faster visual fallback when autoplay is
      blocked or for slow connections. Consider lazy-loading or deferring
      the video source until the hero is visible (IntersectionObserver).
*/

import React from "react";
import ContactForm from "./ContactForm";
import "./Hero.css";

/**
 * Props: `id` is used to anchor the section for in-page navigation.
 */
type HeroProps = {
  id?: string;
};

const Hero: React.FC<HeroProps> = ({ id = "home" }) => {
  return (
    <>
      {/*
        Video wrapper - positioned behind the content using CSS
        (see `Hero.css`). The wrapper contains the <video> tag and a separate
        overlay layer so we can adjust contrast without modifying the video.
      */}
      <div className="hero-video-wrapper">
        {/*
          Video attributes explained inline:
            - autoPlay: request playback when media is loaded (may be blocked)
            - muted: necessary for many browsers to allow autoplay
            - loop: keep the background continuous
            - playsInline: avoid forcing full-screen playback on iOS

          Note: consider adding `aria-hidden="true"` here if the video is
          purely decorative to prevent screen readers from announcing it.
        */}
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="./videos/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Visual overlay for contrast: controls the gradient and darkness */}
        <div className="hero-overlay" />
      </div>

      {/*
        Content layer: headline, supporting text and call-to-action. This is
        visually above the video and should be the primary focus for assistive
        technologies and keyboard users.
      */}
      <div className="hero-inner" id={id}>
        <h1 className="hero-title">
          Forging Digital Magic,
          <br />
          <span className="hero-title-accent">One Experience at a Time</span>
        </h1>

        {/*
          Subtitle: keep text concise and avoid embedding essential info in the
          video since background media may not autoplay for everyone.
        */}
        <p className="hero-subtitle">
          At Arcana Code Forges, we blend the art of code with the science of
          innovation to create captivating digital solutions. From empowering
          startups to enhancing established brands, our mission is to craft
          experiences that resonate and inspire. As a team of full-stack
          developers and dedicated mentors, we’re here to guide you through a
          journey of growth and transformation. Whether you’re seeking tailored
          web solutions or looking to develop the next wave of coding talent,
          let’s bring your vision to life with purpose and precision.
        </p>

        {/* The CTA is encapsulated in a ContactForm component (modal + form) */}
        <ContactForm />
      </div>
    </>
  );
};

export default Hero;
