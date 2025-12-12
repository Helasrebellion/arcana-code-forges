import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Home.css';

type TarotCardData = {
  id: string;
  frontImg: string;
  backImg: string;
  altFront: string;
  altBack: string;
};

type CarouselImage = {
  src: string;
  alt: string;
};


const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdkqygln';

/* ===========================================
              TAROT CARD DATA 
=========================================== */
const tarotCards: TarotCardData[] = [
  {
    id: 'web-design',
    backImg: './images/TarotBack.png',
    frontImg: './images/websitedesignfront.png',
    altBack: 'Tarot card back – Arcana Code Forges',
    altFront: 'Custom Responsive Website Design',
  },
  {
    id: 'full-cycle-dev',
    backImg: './images/TarotBack.png',
    frontImg: './images/softwaredevelopmentfront.png',
    altBack: 'Tarot card back – Arcana Code Forges',
    altFront: 'Custom Full-Cycle Development',
  },
  {
    id: 'mentoring',
    backImg: './images/TarotBack.png',
    frontImg: './images/mentoringfront.png',
    altBack: 'Tarot card back – Arcana Code Forges',
    altFront: 'Mentoring for Beginners',
  },
];

/* ===========================================
            IMAGE CAROUSEL DATA
=========================================== */
const carouselImages: CarouselImage[] = [
  { src: './images/HTMLRune_edited.png', alt: 'HTML rune sigil – Arcana Code Forges' },
  { src: './images/CSSRune_edited.png', alt: 'CSS rune sigil – Arcana Code Forges' },
  { src: './images/JavaScriptRune_edited.png', alt: 'JavaScript rune sigil – Arcana Code Forges' },
  { src: './images/PHPRune_edited.png', alt: 'PHP rune sigil – Arcana Code Forges' },
  { src: './images/ReactRune_edited.png', alt: 'React rune sigil – Arcana Code Forges' },
  { src: './images/AngularRune_edited.png', alt: 'Angular rune sigil – Arcana Code Forges' },
  { src: './images/VueRune_edited.png', alt: 'Vue rune sigil – Arcana Code Forges' },
  { src: './images/PythonRune_edited.png', alt: 'Python rune sigil – Arcana Code Forges' },
  { src: './images/JavaRune_edited.png', alt: 'Java rune sigil – Arcana Code Forges' },
  { src: './images/CSharpRune_edited.png', alt: 'C# rune sigil – Arcana Code Forges' },
  { src: './images/dotnetmvcRune_edited.png', alt: '.NET MVC rune sigil – Arcana Code Forges' },
  { src: './images/KotlinRune_edited.png', alt: 'Kotlin rune sigil – Arcana Code Forges' },
  { src: './images/IonicRune_edited.png', alt: 'Ionic rune sigil – Arcana Code Forges' },
  { src: './images/MySQLRune_edited.png', alt: 'MySQL rune sigil – Arcana Code Forges' },
];

/* ===========================================
          TAROT CARD COMPONENT
=========================================== */
type TarotCardProps = { card: TarotCardData };

const TarotCard: React.FC<TarotCardProps> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="tarot-container">
      <div
        className={`tarot-card ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-label="Flip tarot card"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setFlipped((prev) => !prev);
        }}
      >
        <div className="card-face card-back">
          <img src={card.backImg} alt={card.altBack} />
        </div>
        <div className="card-face card-front">
          <img src={card.frontImg} alt={card.altFront} />
        </div>
      </div>

      <p className="tarot-hint">Tap or hover to flip</p>
    </div>
  );
};

/* ===========================================
           IMAGE CAROUSEL COMPONENT
=========================================== */
const ImageCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const length = carouselImages.length;

  useEffect(() => {
    if (length <= 1) return;
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % length), 3000);
    return () => clearInterval(interval);
  }, [length]);

  if (length === 0) return null;

  const goTo = (index: number) => setCurrent((index + length) % length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <div className="carousel">
      <div className="carousel-window">
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {carouselImages.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {length > 1 && (
        <>
          <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Previous">
            ‹
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Next">
            ›
          </button>

          <div className="carousel-dots" aria-label="Carousel pagination">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === current ? 'is-active' : ''}`}
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

/* ===========================================
                MAIN HOME PAGE
=========================================== */
const Home: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact modal state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Controlled fields (IMPORTANT: IonInput doesn't reliably submit native form values)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Detect scroll-to-bottom inside IonContent
  const handleScroll = (event: CustomEvent) => {
    const el = event.target as HTMLElement;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowFooter(atBottom);
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  // Close mobile menu if user taps outside the nav
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const nav = document.querySelector('.arcana-nav');
      if (!nav) return;
      if (menuOpen && e.target instanceof Node && !nav.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  const openContact = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsContactOpen(true);
  };

  const closeContact = () => setIsContactOpen(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simple client-side validation
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setSubmitError('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          _subject: 'A raven arrives…',
          _gotcha: '',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Form submission failed');
      }

      setSubmitSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');

      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="hero-content" onIonScroll={handleScroll} scrollEvents={true}>
        {/* ================= NAV BAR ================= */}
        <nav className="arcana-nav">
          <div className="arcana-nav-inner">
            <button className="nav-logo" onClick={() => scrollToSection('home')} aria-label="Go to home">
              <img src="./images/ArcanaLogo.png" alt="Arcana Code Forges logo" />
            </button>

            {/* Desktop links */}
            <div className="nav-links desktop-only">
              <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
              <button className="nav-link" onClick={() => scrollToSection('services')}>Services</button>
              <button className="nav-link" onClick={() => scrollToSection('techstack')}>Tech Stack</button>
              <button className="nav-link" onClick={() => scrollToSection('portfolio')}>Portfolio</button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="hamburger mobile-only"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="arcana-mobile-menu"
            >
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>

          {/* Mobile dropdown */}
          <div id="arcana-mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
            <button className="mobile-link" onClick={() => scrollToSection('home')}>Home</button>
            <button className="mobile-link" onClick={() => scrollToSection('services')}>Services</button>
            <button className="mobile-link" onClick={() => scrollToSection('techstack')}>Tech Stack</button>
            <button className="mobile-link" onClick={() => scrollToSection('portfolio')}>Portfolio</button>
          </div>
        </nav>

        {/* ================= HERO VIDEO BACKGROUND ================= */}
        <div className="hero-video-wrapper">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="./videos/hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>

        {/* ================= HERO ================= */}
        <div className="hero-inner" id="home">
          <h1 className="hero-title">
            Forging Digital Magic,
            <br />
            <span className="hero-title-accent">One Experience at a Time</span>
          </h1>

          <p className="hero-subtitle">
            At Arcana Code Forges, we blend the art of code with the science of innovation to create captivating
            digital solutions. From empowering startups to enhancing established brands, our mission is to craft
            experiences that resonate and inspire. As a team of full-stack developers and dedicated mentors, we’re
            here to guide you through a journey of growth and transformation. Whether you’re seeking tailored web
            solutions or looking to develop the next wave of coding talent, let’s bring your vision to life with
            purpose and precision.
          </p>

          <IonButton className="hero-cta" shape="round" size="large" onClick={openContact}>
            Send a raven
          </IonButton>
        </div>

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

        {/* ================= PORTFOLIO / SPELLBOOK ================= */}
        <section className="spellbook-section" id="portfolio">
          <div className="spellbook-header">
            <h2 className="spellbook-title">Our Spellbook of Creations</h2>
            <p className="spellbook-disclaimer">
              Please be aware that many of the enchanted creations we’ve forged remain hidden by powerful
              non-disclosure agreements (NDAs) with clients and employers. These represent but a glimpse of our
              collective craft. Know that we wield a deep well of experience from a wide array of undertakings,
              each forged with care and precision. If you wish to discuss the mysteries of our past work or have
              specific questions, feel free to summon us directly. Thank you for your understanding as we guard
              these arcane secrets.
            </p>
          </div>

          <div className="spellbook-grid">
            {/* PROJECT 1 */}
            <div className="spellbook-item">
              <h3 className="spellbook-project-title">Sylvia Mullins Development V1</h3>

              <div className="spellbook-video-wrapper">
                <video className="spellbook-video" controls playsInline>
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
              <h3 className="spellbook-project-title">Sylvia Mullins Development V2</h3>

              <div className="spellbook-video-wrapper">
                <video className="spellbook-video" controls playsInline>
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
          </div>
        </section>

        {/* ================= FOOTER (ONLY AT BOTTOM) ================= */}
        {showFooter && <Footer />}

        {/* ================= CONTACT MODAL (AJAX SUBMIT, RELIABLE) ================= */}
        <IonModal isOpen={isContactOpen} onDidDismiss={closeContact} className="contact-modal">
          <IonHeader>
            <IonToolbar className="contact-toolbar">
              <IonTitle>Send a Raven</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeContact} aria-label="Close" disabled={isSubmitting}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <form className="contact-body" onSubmit={handleContactSubmit}>
            <p className="contact-note">Send us a message and a raven will return shortly.</p>

            {/* Hidden fields (belt + suspenders) */}
            <input type="hidden" name="name" value={contactName} />
            <input type="hidden" name="email" value={contactEmail} />
            <input type="hidden" name="message" value={contactMessage} />
            <input type="hidden" name="_subject" value="A raven arrives…" />
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            <IonItem className="contact-item" lines="none">
              <IonLabel position="stacked">Your Name</IonLabel>
              <IonInput
                value={contactName}
                onIonInput={(e) => setContactName(e.detail.value ?? '')}
                placeholder="Sylvia"
              />
            </IonItem>

            <IonItem className="contact-item" lines="none">
              <IonLabel position="stacked">Your Email</IonLabel>
              <IonInput
                value={contactEmail}
                onIonInput={(e) => setContactEmail(e.detail.value ?? '')}
                placeholder="you@example.com"
                inputMode="email"
                type="email"
              />
            </IonItem>

            <IonItem className="contact-item" lines="none">
              <IonLabel position="stacked">Message</IonLabel>
              <IonTextarea
                value={contactMessage}
                onIonInput={(e) => setContactMessage(e.detail.value ?? '')}
                autoGrow
                placeholder="Tell us what you want to forge…"
              />
            </IonItem>

            <div className="contact-actions">
              <IonButton fill="clear" type="button" onClick={closeContact} disabled={isSubmitting}>
                Cancel
              </IonButton>

              <IonButton type="submit" className="contact-send" shape="round" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send'}
              </IonButton>
            </div>

            {submitSuccess && <p className="contact-success">🐦‍⬛ Raven sent successfully!</p>}
            {submitError && <p className="contact-error">{submitError}</p>}
          </form>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
