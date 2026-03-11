import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const cardBase =
  "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)]";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

const hoverLift = {
  scale: 1.015,
  y: -3,
  transition: { type: "spring", stiffness: 280, damping: 22 }
};

const stack = ["React", "Next.js", "Node", "Supabase"];

function TechBadge({ label }) {
  return (
    <span className="rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-sm text-slate-200">
      {label}
    </span>
  );
}

export default function App() {
  const vibes = useMemo(() => ["Coding", "Debugging", "Shipping", "Refactoring"], []);
  const [vibeIndex, setVibeIndex] = useState(0);
  const currentVibe = vibes[vibeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-8 text-slate-100 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.15),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(34,197,94,0.16),transparent_26%)]" />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-5 lg:grid-cols-4"
      >
        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={`${cardBase} lg:col-span-2 lg:row-span-2`}
          aria-label="Hero card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Portfolio OS</p>
              <h1 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">
                Vibe Coder and Full-Stack Builder
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)] animate-pulse" />
              Current Vibe: {currentVibe}
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">
            I build calm, high-leverage products with intentional UI systems, resilient backend architecture,
            and execution workflows designed to ship quickly without chaos.
          </p>

          <button
            type="button"
            onClick={() => setVibeIndex((prev) => (prev + 1) % vibes.length)}
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
          >
            Vibe Toggle
          </button>
        </motion.article>

        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={`${cardBase} lg:col-span-2`}
          aria-label="Life-Management OS project"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Large Project</p>
          <h2 className="mt-2 text-xl font-semibold">Life-Management OS</h2>
          <p className="mt-3 text-slate-300">
            A productivity command center focused on crisp UI/UX, modular views, and robust state
            management for habits, planning, and weekly execution loops.
          </p>
        </motion.article>

        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={`${cardBase} lg:col-span-2`}
          aria-label="Family Vault project"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Medium Project</p>
          <h2 className="mt-2 text-xl font-semibold">Family Vault</h2>
          <p className="mt-3 text-slate-300">
            Secure record vault featuring password generation, encrypted storage patterns, and strict
            backend security controls for sensitive data.
          </p>
        </motion.article>

        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={cardBase}
          aria-label="Microbe of the Day project"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Small Project</p>
          <h2 className="mt-2 text-lg font-semibold">Microbe of the Day</h2>
          <p className="mt-3 text-slate-300">
            Placeholder module for a daily API fetch that rotates a new microbe profile with concise
            facts and status metadata.
          </p>
        </motion.article>

        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={cardBase}
          aria-label="Time-Logger project"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Small Project</p>
          <h2 className="mt-2 text-lg font-semibold">Time-Logger</h2>
          <p className="mt-3 text-slate-300">
            Focus tracker with clean data visualization patterns to expose trend lines, drift windows,
            and sprint consistency.
          </p>
        </motion.article>

        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={`${cardBase} lg:col-span-2`}
          aria-label="Tech stack card"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Tech Stack</p>
          <h2 className="mt-2 text-xl font-semibold">Core Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((item) => (
              <TechBadge key={item} label={item} />
            ))}
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
