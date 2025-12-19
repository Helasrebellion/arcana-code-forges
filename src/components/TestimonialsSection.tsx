import React, { useMemo } from "react";
import "./TestimonialsSection.css";

/* ==============================================================
   TestimonialsSection.tsx

   Purpose:
   - Render a set of testimonial "cards" with a decorative rune on each
     card and a global "See More on LinkedIn" button in the footer.
   - Keep the component simple and data-driven: the `TESTIMONIALS`
     array is the single source of content for this section.

   Developer notes (high level):
   - This component is intentionally small and self-contained for easy
     portability. Styling is handled in `TestimonialsSection.css`.
   - Runes are allocated at mount using a deterministic shuffle-based
     allocation (see `runes` below). This keeps the UX stable during a
     user's visit while avoiding duplicate runes when possible.
   - If you add more testimonials than runes, the pool will repeat and
     be reshuffled to minimize obvious repetition.
   ============================================================== */

/* -----------------------------
   Types and data
   ----------------------------- */
/**
 * Type: Testimonial
 * - name: Display name (used as key for list rendering). Avoid duplicates.
 * - title: Short job/title string shown under the name.
 * - date: A human-readable date for the testimonial.
 * - relationship: Short descriptor (e.g., "Managed Sylvia directly").
 * - quote: The testimonial content (can include \n for paragraph breaks).
 * - linkedinUrl: Optional — when provided, this may be used to open the
 *   **direct** LinkedIn recommendation post. Prefer the *direct* post URL.
 */
type Testimonial = {
  name: string;
  title: string;
  date: string;
  relationship: string;
  quote: string;
  linkedinUrl?: string;
};

/**
 * TESTIMONIALS
 * - This array is the lightweight "CMS" for this section.
 * - Keep objects tidy and ensure `name` values are unique (used as React keys).
 * - If you add `linkedinUrl` values, prefer the direct recommendation URL
 *   so the global "See More" or any per-card link can send users straight
 *   to the exact recommendation post.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chuck Lima",
    title: "Application integration and automation specialist",
    date: "October 2, 2025",
    relationship: "Worked with Sylvia on the same team",
    quote:
      "Sylvia is a pleasure to work with; she is fearless and persistent. Sylvia often helped me to see alternative approaches to difficult problems. I would jump at the opportunity to work with Sylvia again.",
    linkedinUrl: "",
  },
  {
    name: "Mehreen Ali-Nannapaneni (PMP)",
    title:
      "Senior Program Manager",
    date: "July 30, 2025",
    relationship: "Senior to Sylvia (not a direct manager)",
    quote:
      "I had the pleasure of working with Sylvia at RedHawk Tech on several projects I managed. She consistently demonstrated a strong ability to solve problems proactively, often reaching out to senior developers and myself whenever blockers arose, helping us stay ahead of potential delays in the project timeline.\n\nSylvia is also a curious and committed learner, always eager to explore new technologies. Despite a full workload, she never hesitated to step up and support her team, often taking on additional responsibilities to ensure project success.\n\nI truly enjoyed working with Sylvia. She is a dedicated, collaborative team player, and any organization would be fortunate to have her on their team.",
    linkedinUrl: "",
  },
  {
    name: "Jason Wilson",
    title: "Principal at Red Hawk Technologies",
    date: "July 29, 2025",
    relationship: "Managed Sylvia directly",
    quote:
      "I worked with Sylvia at Red Hawk Technologies and found her to hard working, a quick learner, and eager. She often went the extra mile for our team and her clients. Any company would be fortunate to have her.",
    linkedinUrl: "",
  },
  {
    name: "Jeremiah Shore",
    title: "Client Solutions Engineer",
    date: "July 22, 2025",
    relationship: "Senior to Sylvia (not a direct manager)",
    quote:
      "Sylvia is a talented, aspiring web developer and software engineer! I had the pleasure of working with her in a few configurations—both directly and indirectly, and on multiple projects—at Red Hawk Technologies.\n\nSylvia asks great questions and doesn't hesitate to dive into new challenges. Her communication style meshes well with mine too. I'm gonna miss her humor and jokes in my day-to-day, and having someone similar to reflect my own. I see a lot of myself in her work, ethic, and hustle. That includes her pathway into engineering after a career with some moderate diversity. Variety and flexibility are part of what makes someone like Sylvia do well in a dynamic environment. She does just fine diving into anything that requires a \"just figure it out\" call to action. I think she can go even further if she's able to find an environment where she can strike a productive balance between the independence she's used to, but with the refined benefits of mentorship, strategic feedback, and intentional development of her potential. You can't fake or create passion, and she's got that magic ingredient! ✨ No doubt, Sylvia's got a great career ahead of her, and I can't wait to see where she lands next!\n\nIf you want a personal recommendation for her, don't hesitate to reach out!",
    linkedinUrl: "",
  },
  {
    name: "Zach Tumbusch",
    title: "Software Engineer - Red Hawk Technologies",
    date: "July 21, 2025",
    relationship: "Worked with Sylvia on the same team",
    quote:
      "To Whom It May Concern,\n\nI am writing to wholeheartedly recommend Sylvia Mullins for any opportunity she may pursue. Sylvia was recently impacted by a companywide workforce reduction, which by no means is a reflection of her performance. I had the pleasure of working alongside Sylvia on several complex web applications at Redhawk Technologies where she consistently stood out as a dedicated, motivated and highly capable team member, displaying her ability to learn, adapt, and solve intricate problems in a timely manner.\n\nSylvia’s commitment to her work is unwavering. She approaches every task—large or small—with diligence, responsibility, and care. One of her most outstanding qualities is her ability to listen intently and learn quickly. She absorbs information with impressive speed and is able to apply it thoughtfully and effectively in her work. This makes her an asset in fast-paced or evolving environments where adaptability and critical thinking are essential. Sylvia takes ownership of her tasks, follows through on commitments, and always looks for ways to improve both the product and the development process. She approaches challenges with curiosity and composure, often stepping up to solve problems that others might shy away from.\n\nBeyond her technical and professional skills, Sylvia is a joy to work with. She brings positivity, humility, and a sincere willingness to support her colleagues. Her calm demeanor, strong work ethic, and eagerness to grow contribute significantly to any team she is a part of.\n\nI have no doubt that Sylvia will be an immediate and lasting benefit to her next employer.",
    linkedinUrl: "",
  },
  {
    name: "Corey Meyer",
    title: "Full-Stack Software Developer",
    date: "July 21, 2025",
    relationship: "Worked with Sylvia on the same team",
    quote:
      "Sylvia has a rare talent for absorbing information and asking the right questions.\n\nWhile working with her, she demonstrated an affinity for growth. Her ability to charge head first into an ecosystem that she is unfamiliar with; and commit to learning and understanding technologies and patterns is remarkable.\n\nI would look forward to an opportunity to work with Sylvia again, and highly recommend her to any team!",
    linkedinUrl: "",
  },
//   {
//     name: "Aaleeyah Ivy-Kilgore",
//     title: "Software Engineer | Web Design | IT | JavaScript",
//     date: "July 19, 2025",
//     relationship: "Worked with Sylvia on the same team",
//     quote:
//       "Sylvia was a great partner when working together on multiple projects together. Sylvia demonstrated that her knowledge was growing and could achieve anything that is thrown towards her.",
//     linkedinUrl: "",
//   },
];

/*
 * initials(name)
 * - Purpose: create a compact initials string to show in the avatar.
 * - Behavior: removes parenthetical content (e.g., credentials), trims
 *   whitespace, splits on spaces, and returns the first characters of the
 *   first and last parts (fallbacks generously to "S" for Sylvia).
 * - Note: This is presentation-only; if you need more sophisticated
 *   avatar logic, consider extracting this into a shared util.
 */
function initials(name: string) {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "S";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * TestimonialsSection Component
 * - Responsibilities:
 *   1. Allocate decorative runes to cards (unique when possible).
 *   2. Render testimonial cards using `TESTIMONIALS` data.
 *   3. Provide a single global footer button to open LinkedIn recommendations.
 *
 * Implementation notes:
 * - Rune allocation: we shuffle runeChars and slice one per testimonial so
 *   duplicates are avoided when there are enough runes. If the testimonial
 *   count exceeds rune count, we repeat the pool and reshuffle to minimize
 *   contiguous duplicates.
 * - Rendering: each card uses `t.name` as the React `key`. Keep this unique
 *   to avoid rendering issues; alternatively use a stable ID if you add one.
 * - Accessibility: runes are decorative and marked `aria-hidden` in markup;
 *   interactive elements use focus-visible outlines in CSS for keyboard users.
 */
export default function TestimonialsSection() {
  const runeChars = "ᛯ ᚨ ᛗ ᛟ ᛦ ᚳ ᛉ ᚼ".split(/\s+/).filter(Boolean); // available rune characters

  const runes = useMemo(() => {
    // Shuffle the rune pool to randomize allocation on mount
    const pool = [...runeChars];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // If there are at least as many runes as testimonials, give each a unique rune
    if (TESTIMONIALS.length <= pool.length) {
      return pool.slice(0, TESTIMONIALS.length);
    }

    // Otherwise, repeat the pool and shuffle the expanded array to minimize repeats
    const multiplier = Math.ceil(TESTIMONIALS.length / pool.length);
    const expanded = Array.from({ length: multiplier }, () => pool).flat();
    for (let i = expanded.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [expanded[i], expanded[j]] = [expanded[j], expanded[i]];
    }

    return expanded.slice(0, TESTIMONIALS.length);
  }, []);


  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header">
        <h2 className="testimonials-title">Seals of Recommendation</h2>
        <p className="testimonials-subtitle">
          Words, like runes, carry power. These are a few that were etched in
          public view.
        </p>
      </div>

      <div className="testimonials-grid" role="list">
        {TESTIMONIALS.map((t, idx) => {
          return (
            <article className="testimonial-card" role="listitem" key={t.name}>
              <div className="testimonial-rune" aria-hidden="true">
                {runes[idx]}
              </div>

              <header className="testimonial-meta">
                <div className="testimonial-avatar" aria-hidden="true">
                  {initials(t.name)}
                </div>

                <div className="testimonial-meta-text">
                  <h3 className="testimonial-name">{t.name}</h3>
                  <p className="testimonial-title">{t.title}</p>

                  <div className="testimonial-fineprint">
                    <span className="testimonial-date">{t.date}</span>
                    <span className="testimonial-dot" aria-hidden="true">
                      •
                    </span>
                    <span className="testimonial-rel">{t.relationship}</span>
                  </div>
                </div>
              </header>

              <blockquote className="testimonial-quote">
                <span className="testimonial-quote-mark" aria-hidden="true">
                  “
                </span>
                {t.quote.split("\n").map((p, idx) =>
                  p.trim().length ? (
                    <p key={idx} className="testimonial-quote-paragraph">
                      {p}
                    </p>
                  ) : null
                )}
              </blockquote>

            </article>
          );
        })}
      </div>

      <div className="testimonials-footer">
        <button
          className="testimonial-link"
          type="button"
          title="Open LinkedIn"
          onClick={() =>
            window.open("https://www.linkedin.com/in/sylviahela/", "_blank", "noopener,noreferrer")
          }
          aria-label="See more on LinkedIn"
        >
          See More on LinkedIn
          <span className="testimonial-link-spark" aria-hidden="true">
            ✧
          </span>
        </button>
      </div>
    </section>
  );
}
