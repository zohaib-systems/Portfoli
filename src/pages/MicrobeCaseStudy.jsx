import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    id: "problem",
    title: "1. Problem",
    body: [
      "Microbiology information is usually distributed across dense, technical sources that are hard to scan quickly.",
      "For learners and curious users, this creates friction: too much context before a useful insight appears.",
      "The core problem was delivering one meaningful microbe insight per day in under a minute of reading."
    ]
  },
  {
    id: "product-idea",
    title: "2. Product Idea",
    body: [
      "Microbe of the Day was designed as a focused daily learning product rather than a full encyclopedia.",
      "The product exists to build a simple habit: open, learn one organism, leave with a practical takeaway.",
      "This scope keeps the user experience light while maintaining scientific credibility."
    ]
  },
  {
    id: "architecture",
    title: "3. Architecture",
    body: [
      "The app follows a client-centric architecture with clear boundaries between data retrieval, transformation, and presentation.",
      "A daily key selects the record to display, the service layer fetches and normalizes API data, and the UI renders stable states for loading, success, and error.",
      "Caching is treated as a separate concern so the view layer remains clean and predictable."
    ]
  },
  {
    id: "tech-stack",
    title: "4. Tech Stack",
    body: [
      "React was chosen for deterministic component state and fast UI iteration.",
      "Vite supports rapid development feedback and efficient production bundles.",
      "Tailwind CSS enables compact, consistent styling for card-driven interfaces.",
      "Framer Motion is used sparingly for transition polish without impacting readability."
    ]
  },
  {
    id: "api-integration",
    title: "5. API Integration",
    body: [
      "Data is fetched through an isolated service function that handles request state, response checks, and output mapping.",
      "External payloads are normalized into a UI-safe model before render to avoid tight coupling with API field variability.",
      "Error and empty states are explicitly handled so the interface remains reliable even when the source is inconsistent."
    ]
  },
  {
    id: "performance-caching",
    title: "6. Performance and Caching",
    body: [
      "A date-based cache key prevents redundant requests across repeat visits on the same day.",
      "If valid cached data exists, the app renders immediately and skips network latency.",
      "This improves perceived performance, lowers API traffic, and preserves a smooth first interaction."
    ]
  },
  {
    id: "challenges",
    title: "7. Challenges",
    body: [
      "The biggest challenge was balancing scientific depth with concise presentation.",
      "Another was handling uneven API quality while preserving a stable user interface.",
      "Deterministic daily content selection and cache invalidation also required careful edge-case handling across time boundaries."
    ]
  },
  {
    id: "future-improvements",
    title: "8. Future Improvements",
    body: [
      "Add typed schema validation for stronger runtime guarantees in the data layer.",
      "Introduce service worker caching for stronger offline behavior and faster repeat loads.",
      "Expand product depth with related microbes, saved favorites, and streak-based engagement features."
    ]
  }
];

export default function MicrobeCaseStudy() {
  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-slate-100 md:px-8 md:py-10">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.14),transparent_32%),radial-gradient(circle_at_86%_78%,rgba(34,197,94,0.14),transparent_28%)]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Case Study</p>
            <Link
              to="/"
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:bg-white/20"
            >
              Back To Portfolio
            </Link>
          </div>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Microbe of the Day</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            A technical case study focused on product rationale, system architecture, and engineering decisions behind a
            daily microbiology insight application.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Role</p>
              <p className="mt-1 text-sm font-medium text-white">Product Engineer</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Primary Focus</p>
              <p className="mt-1 text-sm font-medium text-white">API-driven Daily UX</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Audience</p>
              <p className="mt-1 text-sm font-medium text-white">Recruiters and Engineers</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.25 }}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_16px_35px_rgba(2,6,23,0.36)] backdrop-blur-xl md:p-6"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-3 space-y-2.5">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-slate-300 md:text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
