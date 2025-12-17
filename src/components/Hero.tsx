import React from "react";
import ContactForm from "./ContactForm";
import "./Hero.css";

type HeroProps = {
  id?: string;
};

const Hero: React.FC<HeroProps> = ({ id = "home" }) => {
  return (
    <>
      <div className="hero-video-wrapper">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="./videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-inner" id={id}>
        <h1 className="hero-title">
          Forging Digital Magic,
          <br />
          <span className="hero-title-accent">One Experience at a Time</span>
        </h1>

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

        <ContactForm />
      </div>
    </>
  );
};

export default Hero;
