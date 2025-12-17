import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";

type CarouselImage = {
  src: string;
  alt: string;
};

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
  const [current, setCurrent] = useState(0);
  const length = carouselImages.length;

  useEffect(() => {
    if (length <= 1) return;
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % length),
      3000
    );
    return () => clearInterval(interval);
  }, [length]);

  if (length === 0) return null;

  const goTo = (index: number) => setCurrent((index + length) % length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <div className="carousel">
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {length > 1 && (
        <>
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
