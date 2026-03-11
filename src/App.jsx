import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const techCategories = [
  {
    title: "Frontend",
    accent: "from-cyan-400/25 to-sky-400/10",
    items: ["React", "Next.js", "TypeScript", "Tailwind"]
  },
  {
    title: "Backend",
    accent: "from-emerald-400/25 to-teal-400/10",
    items: ["Node.js", "Express"]
  },
  {
    title: "Database",
    accent: "from-indigo-400/25 to-blue-400/10",
    items: ["MongoDB", "PostgreSQL", "Supabase"]
  },
  {
    title: "DevOps",
    accent: "from-amber-400/25 to-orange-400/10",
    items: ["Docker", "Vercel"]
  },
  {
    title: "AI / Data",
    accent: "from-fuchsia-400/20 to-violet-400/10",
    items: ["TensorFlow", "PyTorch", "LangChain", "Vector Databases"]
  }
];

const techGlyph = {
  React: "R",
  "Next.js": "N",
  TypeScript: "TS",
  Tailwind: "TW",
  "Node.js": "ND",
  Express: "EX",
  MongoDB: "MG",
  PostgreSQL: "PG",
  Supabase: "SB",
  Docker: "DK",
  Vercel: "VC",
  TensorFlow: "TF",
  PyTorch: "PT",
  LangChain: "LC",
  "Vector Databases": "VD"
};

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
    title: "Password Buddy",
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
    title: "Time Logger",
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
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/zohaib-systems"
};

const labExperiments = [
  {
    id: "api-pulse",
    name: "API Pulse",
    description: "Tracks response time and failure spikes to surface backend reliability issues early.",
    tags: ["React", "REST", "Charts"],
    linkLabel: "Source",
    linkUrl: "https://github.com/yourname/api-pulse"
  },
  {
    id: "ux-motion-lab",
    name: "UX Motion Lab",
    description: "Tests small interaction patterns to improve clarity and feedback in product interfaces.",
    tags: ["React", "Tailwind", "Motion"],
    linkLabel: "Preview",
    linkUrl: "https://github.com/yourname/ux-motion-lab"
  },
  {
    id: "token-studio",
    name: "Token Studio",
    description: "Explores reusable spacing and color tokens for faster and more consistent UI delivery.",
    tags: ["Design Tokens", "CSS", "Tailwind"],
    linkLabel: "Source",
    linkUrl: "https://github.com/yourname/token-studio"
  },
  {
    id: "markdown-mini",
    name: "Markdown Mini",
    description: "Lightweight markdown editor prototype focused on speed and keyboard-first workflow.",
    tags: ["React", "Vite", "Markdown"],
    linkLabel: "Preview",
    linkUrl: "https://github.com/yourname/markdown-mini"
  }
];

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

function FeaturedProjectsSection({ featuredProjects, openCaseStudy }) {
  const [leadProject, ...supportingProjects] = featuredProjects;

  const renderCaseStudy = (project) => {
    if (project.id === "microbe-day") {
      return (
        <Link
          to="/case-studies/microbe-of-the-day"
          className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:bg-white/20"
        >
          Case Study
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={() => openCaseStudy(project)}
        className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:bg-white/20"
      >
        Case Study
      </button>
    );
  };

  const renderProjectCard = (project, isLead = false) => (
    <motion.article
      key={project.id}
      whileHover={hoverLift}
      className={`rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_20px_45px_rgba(2,6,23,0.45)] backdrop-blur-xl ${
        isLead ? "p-7" : "p-6"
      }`}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/85">
        <div className="absolute inset-x-0 top-0 z-20 flex h-7 items-center gap-1.5 border-b border-white/10 bg-slate-950/85 px-3">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        <iframe
          title={`${project.title} preview`}
          src={project.liveUrl}
          className={`w-full border-0 pt-7 ${isLead ? "h-[22rem] md:h-[27rem]" : "h-56 md:h-64"}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <h3 className={`mt-5 font-bold text-white ${isLead ? "text-3xl md:text-4xl" : "text-2xl"}`}>{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{project.problem}</p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-white/10 bg-slate-800/70 px-3 py-1.5 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-cyan-300/30 bg-cyan-400/15 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
        >
          Live Demo
        </a>
        {renderCaseStudy(project)}
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/15 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
        >
          Source Code
        </a>
      </div>
    </motion.article>
  );

  return (
    <motion.section
      variants={fadeUp}
      className={`${cardBase} lg:col-span-4`}
      aria-label="Featured projects section"
    >
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Project Showcase</p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Featured Projects</h2>
        <p className="max-w-3xl text-sm text-slate-300 md:text-base">
          A focused selection of products that demonstrate practical problem solving across data, productivity, and
          security workflows.
        </p>
      </div>

      {leadProject && renderProjectCard(leadProject, true)}

      {supportingProjects.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
          {supportingProjects.map((project) => renderProjectCard(project))}
        </div>
      )}
    </motion.section>
  );
}

function LabExperimentsSection({ experiments }) {
  return (
    <motion.section variants={fadeUp} className={`${cardBase} lg:col-span-4`} aria-label="Lab experiments section">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">R and D</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-100 md:text-2xl">Lab Experiments</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
          {experiments.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {experiments.map((item) => (
          <article
            key={item.id}
            className="group rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3.5 shadow-[0_14px_28px_rgba(2,6,23,0.35)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25"
          >
            <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-slate-900/70 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={item.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center rounded-md border border-cyan-300/25 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              {item.linkLabel}
            </a>
          </article>
        ))}
      </div>
    </motion.section>
  );
}

function ContactSection({ channels }) {
  const contactItems = [
    {
      id: "email",
      label: "Email",
      value: channels.email,
      href: `mailto:${channels.email}`,
      accent: "text-emerald-300",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )
    },
    {
      id: "github",
      label: "GitHub",
      value: "zohaib-systems",
      href: channels.github,
      accent: "text-cyan-300",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.5 2.3 1.07 2.87.82.09-.64.35-1.07.63-1.32-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.7 9.7 0 0 1 12 6.8c.85 0 1.7.12 2.5.35 1.91-1.29 2.75-1.02 2.75-1.02.54 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.83-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
      )
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "Professional Profile",
      href: channels.linkedin,
      accent: "text-sky-300",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.9 1.96 1.96 0 0 0 5.25 3ZM20.44 13.42c0-3.24-1.73-4.75-4.03-4.75-1.86 0-2.69 1.02-3.16 1.74V8.5H9.88V20h3.37v-5.7c0-1.5.29-2.95 2.15-2.95 1.84 0 1.86 1.72 1.86 3.05V20h3.38v-6.58Z" />
        </svg>
      )
    }
  ];

  if (channels.whatsapp) {
    contactItems.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: channels.phone,
      href: channels.whatsapp,
      accent: "text-emerald-300",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12.03 2A9.95 9.95 0 0 0 3.5 17.25L2 22l4.88-1.45A9.97 9.97 0 1 0 12.03 2Zm5.8 14.31c-.25.71-1.45 1.3-2 1.4-.53.1-1.2.15-1.93-.08-.44-.14-1-.33-1.73-.65-3.04-1.32-5.02-4.4-5.17-4.6-.15-.2-1.24-1.64-1.24-3.13s.78-2.23 1.06-2.54c.28-.3.6-.38.8-.38h.57c.18 0 .42-.07.65.49.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.3.4-.43.54-.15.15-.3.32-.13.62.18.3.79 1.3 1.69 2.1 1.16 1.04 2.14 1.37 2.45 1.52.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.78.84 2.08.99.3.15.5.22.58.35.08.13.08.76-.17 1.47Z" />
        </svg>
      )
    });
  }

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="relative mx-auto mt-5 max-w-7xl"
      aria-label="Contact section"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(8,47,73,0.46),rgba(15,23,42,0.94))] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.5)] ring-1 ring-cyan-300/20 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Open For Collaboration</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-4xl">Let's Build Something Useful</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              I work with teams that care about clear product thinking and reliable engineering. If you are hiring or
              building something meaningful, reach out through any channel below.
            </p>
          </div>

          <a
            href={`mailto:${channels.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/20 px-5 py-2.5 text-sm font-semibold text-cyan-50 shadow-[0_0_30px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300/30"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Start Conversation
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.id === "email" ? undefined : "_blank"}
              rel={item.id === "email" ? undefined : "noopener noreferrer"}
              className="group rounded-xl border border-white/15 bg-white/5 p-3.5 text-sm text-slate-100 transition hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center gap-2">
                <span className={`${item.accent}`}>{item.icon}</span>
                <span className="text-xs uppercase tracking-[0.13em] text-slate-300">{item.label}</span>
              </div>
              <span className="mt-2 block font-medium text-slate-100">{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SnapshotMetricCard({ label, value, accent }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const startedAt = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <motion.article
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_16px_35px_rgba(2,6,23,0.35)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
      </div>
      <div className="mt-3 text-3xl font-semibold leading-none text-white">{displayValue}</div>
    </motion.article>
  );
}

function EngineeringSnapshotSection({ metrics }) {
  return (
    <motion.section
      variants={fadeUp}
      className={`${cardBase} lg:col-span-4`}
      aria-label="Engineering snapshot section"
    >
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Capability Metrics</p>
        <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">Engineering Snapshot</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <SnapshotMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            accent={metric.accent}
          />
        ))}
      </div>
    </motion.section>
  );
}

function TechStackSection({ categories }) {
  return (
    <motion.section variants={fadeUp} className={`${cardBase} lg:col-span-4`} aria-label="Tech stack section">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Capability Matrix</p>
        <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.title}
            className="group rounded-xl border border-white/10 bg-slate-950/55 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25"
          >
            <div className={`mb-3 rounded-lg bg-gradient-to-r ${category.accent} px-3 py-2`}>
              <h3 className="text-sm font-semibold text-white">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition group-hover:bg-white/10"
                >
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-400/15 px-1 text-[10px] font-semibold text-cyan-100">
                    {techGlyph[item] || "*"}
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
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
  const heroProject = projects.find((project) => project.id === "microbe-day") || projects[0];
  const [mobileMode, setMobileMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectTechnologies = useMemo(() => [...new Set(projects.flatMap((project) => project.tags))], []);
  const featuredProjects = useMemo(() => {
    const featuredById = {
      "microbe-day": {
        problem: "Turns dense microbiology data into a quick daily insight that people can understand in seconds."
      },
      "time-logger": {
        problem: "Helps users track where time is lost and build more consistent, focused work routines."
      },
      "family-vault": {
        problem: "Makes password management safer and simpler for individuals and families handling sensitive accounts."
      }
    };

    const order = ["microbe-day", "time-logger", "family-vault"];

    return order
      .map((id) => {
        const project = projects.find((item) => item.id === id);
        if (!project) return null;
        return { ...project, problem: featuredById[id].problem };
      })
      .filter(Boolean);
  }, []);
  const engineeringMetrics = useMemo(
    () => [
      { label: "Projects Built", value: projects.length, accent: "bg-cyan-300" },
      {
        label: "Technologies Used",
        value: new Set([...stack, ...visionTech, ...projectTechnologies]).size,
        accent: "bg-emerald-300"
      },
      {
        label: "Deployed Applications",
        value: projects.filter((project) => Boolean(project.liveUrl)).length,
        accent: "bg-sky-300"
      },
      { label: "GitHub Repositories", value: 24, accent: "bg-indigo-300" }
    ],
    [projectTechnologies]
  );

  useEffect(() => {
    const detectMobile = () => setMobileMode(window.innerWidth < 768);
    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onEsc = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [selectedProject]);

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
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Developer Portfolio</p>
              <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
                I build production-ready web products that help teams move faster.
              </h1>

              <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">
                Full-stack systems with React frontends, scalable APIs, and clean deployment pipelines. My focus is
                simple interfaces, reliable architecture, and tools people actually use.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#featured-projects"
                  className="inline-flex items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-400/15 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                >
                  Contact
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {projects.length} shipped projects
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {stack.length}+ core technologies
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-sky-300" />
                  End-to-end delivery
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/90 p-3">
              <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-950/85">
                <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-slate-950/90 px-3">
                  <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                </div>
                <iframe
                  title={`${heroProject.title} snapshot preview`}
                  src={heroProject.liveUrl}
                  className="h-[18rem] w-full border-0 md:h-[22rem]"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="strict-origin-when-cross-origin"
                />

                <div className="border-t border-white/10 bg-slate-900/85 p-4">
                  <h3 className="text-base font-semibold text-white md:text-lg">{heroProject.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 md:text-sm">{heroProject.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <EngineeringSnapshotSection metrics={engineeringMetrics} />

        <FeaturedProjectsSection featuredProjects={featuredProjects} openCaseStudy={setSelectedProject} />

        <TechStackSection categories={techCategories} />

        <LabExperimentsSection experiments={labExperiments} />

      </motion.div>

      <ContactSection channels={contactChannels} />

      <PreviewModal project={selectedProject} closeModal={() => setSelectedProject(null)} />
    </section>
  );
}
