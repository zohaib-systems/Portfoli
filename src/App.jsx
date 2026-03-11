import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const cardBase =
  "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] ring-1 ring-white/5";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

const hoverLift = {
  scale: 1.015,
  y: -3,
  transition: { type: "spring", stiffness: 280, damping: 22 }
};

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Docker"
];

const visionTech = [
  "Python",
  "AI Engineering",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "LangChain",
  "RAG Systems",
  "Vector Databases",
  "MLOps",
  "TensorFlow",
  "PyTorch"
];

const projects = [
  {
    id: "life-management-os",
    title: "Life-Management OS",
    size: "lg:col-span-2",
    summary: "Deliberate UI/UX flow with modular state management across planning, focus, and reflection.",
    tags: ["JavaScript", "LocalStorage", "Productivity UI"],
    liveUrl: "https://zohaib-systems.github.io/Life-Management/",
    sourceUrl: "https://github.com/yourname/life-management-os"
  },
  {
    id: "family-vault",
    title: "Family Vault",
    size: "lg:col-span-2",
    summary: "Password generation workflows, encrypted records, and hardened backend security paths.",
    tags: ["JavaScript", "Password Generator", "Security Patterns"],
    liveUrl: "https://zohaib-systems.github.io/Password-buddy/",
    sourceUrl: "https://github.com/yourname/family-vault"
  },
  {
    id: "microbe-day",
    title: "Microbe of the Day",
    size: "",
    summary: "Daily API fetch card with micro-summary insights and lightweight caching logic.",
    tags: ["React", "REST API", "Vercel"],
    liveUrl: "https://microbe-of-the-day.vercel.app/",
    sourceUrl: "https://github.com/yourname/microbe-day"
  },
  {
    id: "time-logger",
    title: "Time-Logger",
    size: "",
    summary: "Session tracking with focused data visualization for consistency and trend clarity.",
    tags: ["JavaScript", "Analytics", "Eisenhower Matrix"],
    liveUrl: "https://zohaib-systems.github.io/Time-logger/",
    sourceUrl: "https://github.com/yourname/time-logger"
  }
];

const contactChannels = {
  email: "hello@example.com",
  phone: "+1 000 000 0000",
  whatsapp: "https://wa.me/10000000000",
  facebook: "https://www.facebook.com/your-handle",
  github: "https://github.com/zohaib-systems"
};

function TechBadge({ label }) {
  return (
    <span className="rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-sm font-medium text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
      {label}
    </span>
  );
}

function PreviewSurface({ project, mobileMode, openModal, isPrimary }) {
  const previewHeight =
    project.id === "life-management-os"
      ? "h-[22rem] md:h-[28rem] lg:h-[32rem]"
      : project.id === "family-vault"
      ? "h-56 md:h-64"
      : "h-48 md:h-56";

  return (
    <div className="group/preview relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-[0_8px_30px_rgba(2,6,23,0.5)]">
      <div className="absolute inset-x-0 top-0 z-20 flex h-7 items-center gap-1.5 border-b border-white/10 bg-slate-950/85 px-3">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-300/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
      <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-200">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.95)] animate-pulse" />
        Live
      </div>
      {!isPrimary && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 z-20 rounded-lg border border-cyan-300/30 bg-cyan-400/20 px-3 py-1.5 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/30"
        >
          Open Live
        </a>
      )}
      {!mobileMode ? (
        <iframe
          title={`${project.title} preview`}
          src={project.liveUrl}
          className={`${previewHeight} w-full border-0 pt-7 transition duration-300 group-hover/preview:scale-[1.01]`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className={`${previewHeight} w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-7`} />
      )}

      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2">
        <span className="rounded-full border border-white/15 bg-slate-950/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-slate-300">
          {mobileMode ? "Preview Snapshot" : "Live Preview"}
        </span>
        {!isPrimary && (
          <button
            type="button"
            onClick={() => openModal(project)}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-white/20"
          >
            Open Viewer
          </button>
        )}
      </div>

      {isPrimary && (
        <div className="absolute inset-0 z-20 flex items-end justify-center p-4 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
          <div className="flex w-full max-w-md flex-wrap justify-center gap-2 rounded-xl border border-white/15 bg-slate-950/65 p-2.5 backdrop-blur-md">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cyan-300/30 bg-cyan-400/20 px-3 py-1.5 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/30"
            >
              Open Live
            </a>
            <button
              type="button"
              onClick={() => openModal(project)}
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-white/20"
            >
              Open Viewer
            </button>
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
            >
              Source
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, mobileMode, openModal }) {
  const isPrimary = project.id === "life-management-os";

  return (
    <motion.article
      id={project.id}
      variants={fadeUp}
      whileHover={hoverLift}
      className={`${cardBase} group ${project.size}`.trim()}
      aria-label={`${project.title} project card`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Project Window</span>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-cyan-300/30 bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-100 hover:bg-cyan-400/25"
        >
          Live Site
        </a>
      </div>
      <PreviewSurface project={project} mobileMode={mobileMode} openModal={openModal} isPrimary={isPrimary} />

      {!isPrimary && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold md:text-xl">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.summary}</p>
        </div>
      )}

      {!isPrimary && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/10 bg-slate-800/70 px-2.5 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      )}

      {!isPrimary && (
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-cyan-300/30 bg-cyan-400/20 px-3 py-1.5 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/30"
          >
            Live Preview
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-white/20"
          >
            Source
          </a>
          <button
            type="button"
            onClick={() => openModal(project)}
            className="rounded-lg border border-white/15 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
          >
            Case Study
          </button>
        </div>
      )}
    </motion.article>
  );
}

function PreviewModal({ project, closeModal }) {
  if (!project) return null;

  const [device, setDevice] = useState("desktop");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-3 md:items-center md:p-6">
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-2xl md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="text-lg font-semibold">{project.title} Viewer</h4>
            <p className="text-xs text-slate-400">Switch desktop and mobile framing.</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`rounded-md border px-3 py-1 text-xs ${
              device === "desktop" ? "border-cyan-300/35 bg-cyan-400/10 text-cyan-200" : "border-white/15 text-slate-300"
            }`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`rounded-md border px-3 py-1 text-xs ${
              device === "mobile" ? "border-cyan-300/35 bg-cyan-400/10 text-cyan-200" : "border-white/15 text-slate-300"
            }`}
          >
            Mobile
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <div
            className={`overflow-hidden rounded-xl border border-white/10 bg-slate-950 ${
              device === "mobile" ? "w-[320px]" : "w-full"
            }`}
          >
            <iframe
              title={`${project.title} modal preview`}
              src={project.liveUrl}
              className="h-[430px] w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          If a project blocks embedding via iframe security headers, use the Live Preview button to open it in a new tab.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const vibes = useMemo(() => ["Coding", "Debugging", "Shipping", "Refactoring"], []);
  const [vibeIndex, setVibeIndex] = useState(0);
  const [activeSnapshot, setActiveSnapshot] = useState(0);
  const [pauseSnapshots, setPauseSnapshots] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const currentVibe = vibes[vibeIndex];
  const projectTechnologies = useMemo(() => [...new Set(projects.flatMap((project) => project.tags))], []);

  useEffect(() => {
    const detectMobile = () => setMobileMode(window.innerWidth < 768);
    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    if (pauseSnapshots) return undefined;
    const interval = window.setInterval(() => {
      setActiveSnapshot((prev) => (prev + 1) % projects.length);
    }, 4600);
    return () => window.clearInterval(interval);
  }, [pauseSnapshots]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onEsc = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [selectedProject]);

  const jumpToProject = (id) => {
    setActiveSnapshot(projects.findIndex((project) => project.id === id));
    const node = document.getElementById(id);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const primaryProject = projects.find((project) => project.id === "life-management-os");
  const familyProject = projects.find((project) => project.id === "family-vault");
  const secondaryProjects = projects.filter(
    (project) => project.id !== "life-management-os" && project.id !== "family-vault"
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-8 text-slate-100 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.15),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(34,197,94,0.16),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-5 lg:grid-cols-4"
      >
        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={`${cardBase} lg:col-span-4`}
          aria-label="Hero card"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
            <div>
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
                A showcase command center with project snapshots on top and live preview cards below.
                Built for fast trust: users see product quality before reading details.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setVibeIndex((prev) => (prev + 1) % vibes.length)}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                >
                  Vibe Toggle
                </button>
                <button
                  type="button"
                  onClick={() => jumpToProject(projects[activeSnapshot].id)}
                  className="inline-flex items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  Open Active Project
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/20"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div
              className="relative min-h-[260px]"
              onMouseEnter={() => setPauseSnapshots(true)}
              onMouseLeave={() => setPauseSnapshots(false)}
            >
              {projects.map((project, index) => {
                const offset = (index - activeSnapshot + projects.length) % projects.length;
                const visualOffset = offset > 2 ? offset - projects.length : offset;
                const isFront = offset === 0;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => jumpToProject(project.id)}
                    className="absolute left-0 right-0 top-0 h-56 w-full text-left"
                    style={{
                      transform: `translateY(${visualOffset * 18}px) scale(${isFront ? 1 : 0.95})`,
                      zIndex: 20 - Math.abs(visualOffset),
                      opacity: Math.abs(visualOffset) > 2 ? 0 : isFront ? 1 : 0.55,
                      transition: "all 320ms ease"
                    }}
                    aria-label={`Show ${project.title}`}
                  >
                    <div className="h-full w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 p-3">
                      <div className="h-full w-full rounded-lg border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-3">
                        <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Snapshot</div>
                        <h3 className="mt-2 text-sm font-semibold md:text-base">{project.title}</h3>
                        <p className="mt-2 line-clamp-2 text-xs text-slate-300">{project.summary}</p>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 px-1">
                {projects.map((project, index) => (
                  <button
                    key={`${project.id}-progress`}
                    type="button"
                    aria-label={`Activate ${project.title}`}
                    onClick={() => setActiveSnapshot(index)}
                    className="h-1.5 flex-1 rounded-full bg-white/10"
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        index === activeSnapshot ? "w-full bg-cyan-300" : "w-1/3 bg-white/25"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {primaryProject && (
          <ProjectCard
            key={primaryProject.id}
            project={primaryProject}
            mobileMode={mobileMode}
            openModal={setSelectedProject}
          />
        )}

        {familyProject && (
          <ProjectCard
            key={familyProject.id}
            project={familyProject}
            mobileMode={mobileMode}
            openModal={setSelectedProject}
          />
        )}

        <motion.article
          variants={fadeUp}
          whileHover={hoverLift}
          className={`${cardBase} lg:col-span-2`}
          aria-label="Tech stack card"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Tech Stack</p>
          <h2 className="mt-2 text-xl font-semibold">Portfolio Stack</h2>

          <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Build Console</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Healthy
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "40%" }}
                animate={{ width: ["40%", "88%", "70%", "92%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="h-full bg-[linear-gradient(90deg,#22d3ee,#60a5fa,#34d399)]"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((item) => (
              <TechBadge key={item} label={item} />
            ))}
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-slate-400">Project Technologies</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {projectTechnologies.map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/10 bg-slate-800/70 px-2.5 py-1 text-xs text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-slate-400">Vision Technologies</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {visionTech.map((item) => (
              <span
                key={item}
                className="rounded-md border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-100"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.article>

        {secondaryProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            mobileMode={mobileMode}
            openModal={setSelectedProject}
          />
        ))}
      </motion.div>

      <motion.footer
        id="contact"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative mx-auto mt-5 max-w-7xl"
        aria-label="Contact footer"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(6,78,59,0.45),rgba(15,23,42,0.9))] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.5)] ring-1 ring-emerald-300/20 md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-emerald-200/80">Call To Action</p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Let's Build Something Useful</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">
                Available for freelance and full-time opportunities. Choose any channel below and I will respond quickly.
              </p>
            </div>
            <a
              href={`mailto:${contactChannels.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200/40 bg-emerald-300/20 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-300/30"
            >
              Start A Conversation
            </a>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`mailto:${contactChannels.email}`}
              className="rounded-xl border border-emerald-200/25 bg-emerald-300/10 p-3 text-sm text-emerald-50 hover:bg-emerald-300/20"
            >
              <span className="block text-xs uppercase tracking-[0.12em] text-emerald-100/80">Email</span>
              <span className="mt-1 block font-medium">{contactChannels.email}</span>
            </a>

            <a
              href={contactChannels.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-cyan-200/25 bg-cyan-300/10 p-3 text-sm text-cyan-50 hover:bg-cyan-300/20"
            >
              <span className="block text-xs uppercase tracking-[0.12em] text-cyan-100/80">WhatsApp</span>
              <span className="mt-1 block font-medium">{contactChannels.phone}</span>
            </a>

            <a
              href={contactChannels.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-slate-100 hover:bg-white/15"
            >
              <span className="block text-xs uppercase tracking-[0.12em] text-slate-300">Facebook</span>
              <span className="mt-1 block font-medium">Professional Profile</span>
            </a>

            <a
              href={contactChannels.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-slate-100 hover:bg-white/15"
            >
              <span className="block text-xs uppercase tracking-[0.12em] text-slate-300">GitHub</span>
              <span className="mt-1 block font-medium">Code Samples</span>
            </a>
          </div>
        </div>
      </motion.footer>

      <PreviewModal project={selectedProject} closeModal={() => setSelectedProject(null)} />
    </section>
  );
}
