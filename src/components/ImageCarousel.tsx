import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";

/*
  ImageCarousel
  -------------
  - A lightweight, self-contained image carousel for the "Runes of the Craft"
    section.
  - Behavior: automatically advances every 3s (when there is more than one
    slide), and exposes controls for previous/next and pagination dots.

  Accessibility & UX notes:
  - Each slide image has an `alt` attribute describing the image.
  - Buttons are keyboard-focusable and provide accessible labels.
  - The carousel is intentionally simple (no focus trap). For better
    accessibility in complex carousels consider a fully keyboard-manageable
    pattern (pause on focus, announce slide changes via aria-live, etc.).
*/

type CarouselImage = {
  src: string; // Image path used by the <img> element
  alt: string; // Accessible alt text for the image
};

// The list of images used in the carousel. Keep this array small and static
// for now; if this data becomes dynamic, consider fetching it from a
// centralized data module and handling loading states.
const carouselImages: CarouselImage[] = [
  {
    src: "./images/HTMLRune_edited.png",
    alt: "HTML rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/CSSRune_edited.png",
    alt: "CSS rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/JavaScriptRune_edited.png",
    alt: "JavaScript rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/PHPRune_edited.png",
    alt: "PHP rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/ReactRune_edited.png",
    alt: "React rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/AngularRune_edited.png",
    alt: "Angular rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/VueRune_edited.png",
    alt: "Vue rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/PythonRune_edited.png",
    alt: "Python rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/JavaRune_edited.png",
    alt: "Java rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/CSharpRune_edited.png",
    alt: "C# rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/dotnetmvcRune_edited.png",
    alt: ".NET MVC rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/KotlinRune_edited.png",
    alt: "Kotlin rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/IonicRune_edited.png",
    alt: "Ionic rune sigil – Arcana Code Forges",
  },
  {
    src: "./images/MySQLRune_edited.png",
    alt: "MySQL rune sigil – Arcana Code Forges",
  },
];

const ImageCarousel: React.FC = () => {
  // current: index of the currently visible slide
  const [current, setCurrent] = useState(0);
  const length = carouselImages.length;

  /*
    Auto-advance effect:
      - Only runs when there is more than one slide to avoid unnecessary
        timers on single-image pages.
      - Advances every 3000ms (3s); the returned cleanup clears the interval
        to avoid memory leaks when the component unmounts or `length`
        changes.
      - We depend on `length` only; `current` updates via the interval
        callback which reads the latest state via functional update.
  */
  useEffect(() => {
    if (length <= 1) return;

    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % length),
      3000
    );

    return () => clearInterval(interval);
  }, [length]);

  // Defensive: if no images are provided, render nothing to avoid errors
  if (length === 0) return null;

  // Helper to go to a specific index (wraps negative/overflow indexes)
  const goTo = (index: number) => setCurrent((index + length) % length);
  // Move to next/previous slides using the helper
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  /*
    Rendering notes:
      - `carousel-track` is translated horizontally based on the current
        index: translateX(-N * 100%) where N is the current slide index.
      - Controls are only shown when there is more than one slide.
      - Pagination dots provide direct navigation and an `aria-label` for
        screen readers. For more advanced accessibility, consider adding
        `aria-live` announcements when the slide changes.
  */
  return (
    <div className="carousel">
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div className="carousel-slide" key={index}>
              {/* Each image includes meaningful alt text for accessibility */}
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {length > 1 && (
        <>
          {/* Previous/Next controls: keyboard-focusable, with aria-labels */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={prev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={next}
            aria-label="Next"
          >
            ›
          </button>

          {/* Pagination dots: allow direct navigation to slides */}
          <div className="carousel-dots" aria-label="Carousel pagination">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === current ? "is-active" : ""
                }`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
