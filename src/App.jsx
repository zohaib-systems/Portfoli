import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cardBase =
  "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] ring-1 ring-white/5";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Biological/Organic ease-out
    }
  }
};

const hoverLift = {
  scale: 1.015,
  y: -3,
  transition: { type: "spring", stiffness: 260, damping: 25 }
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
    id: "study-converter",
    title: "Study Converter",
    size: "lg:col-span-2",
    summary: "A high-performance utility for normalizing and converting complex study datasets into structured technical modules.",
    tags: ["JavaScript", "Data Conversion", "Optimization"],
    liveUrl: "https://study-converter.netlify.app/",
    sourceUrl: "https://github.com/yourname/family-vault"
  },
  {
    id: "waste-wise",
    title: "WasteWise",
    size: "",
    summary: "AI-powered sustainability engine for optimized waste management and environmental impact tracking.",
    tags: ["React", "AI Engine", "Sustainability"],
    liveUrl: "https://wastewise-72852433259.us-west1.run.app/",
    sourceUrl: "https://github.com/zohaib-systems/waste-wise"
  },
  {
    id: "zohaib-path",
    title: "Zohaib's Path",
    size: "",
    summary: "A dynamic roadmap tracking the synthesis of biological data and architectural milestones in real-time.",
    tags: ["React", "Roadmap", "Data Synthesis"],
    liveUrl: "https://zohaib-s-path.vercel.app/",
    sourceUrl: "https://github.com/yourname/zohaib-path"
  }
];

const contactChannels = {
  email: "contact.zhust@gmail.com",
  phone: "03293531951",
  whatsapp: "https://wa.me/923293531951",
  linkedin: "https://www.linkedin.com/in/zohaib-ali-5b1502220",
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
      <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-neon-petri/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-200 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-emerald shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        Live System
      </div>
      {!isPrimary && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 z-20 rounded-lg border border-cyan-400/30 bg-electric-cyan/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pale-mint hover:bg-cyan-400/20 font-mono"
        >
          Access
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
        <span className="rounded-full border border-white/15 bg-slate-950/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-cool-gray">
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
              className="rounded-lg border border-cyan-300/30 bg-cyan-400/20 px-3 py-1.5 text-xs font-semibold text-pale-mint hover:bg-cyan-400/30"
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
  const isPrimary = project.id === "study-converter";

  return (
    <motion.article
      id={project.id}
      variants={fadeUp}
      whileHover={hoverLift}
      className={`${cardBase} group ${project.size}`.trim()}
      aria-label={`${project.title} project card`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.15em] text-cool-gray">Project Window</span>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-cyan-300/30 bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-pale-mint hover:bg-cyan-400/25"
        >
          Live Site
        </a>
      </div>
      <PreviewSurface project={project} mobileMode={mobileMode} openModal={openModal} isPrimary={isPrimary} />

      {!isPrimary && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold md:text-xl">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cool-gray">{project.summary}</p>
        </div>
      )}

      {!isPrimary && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/10 bg-slate-800/70 px-2.5 py-1 text-xs text-cool-gray">
              {tag}
            </span>
          ))}
        </div>
      )}

      {!isPrimary && (
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-cyan-400/30 bg-electric-cyan/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pale-mint hover:bg-cyan-400/20 font-mono"
          >
            Access Module
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cool-gray hover:bg-white/10 font-mono"
          >
            Source Logic
          </a>
          <button
            type="button"
            onClick={() => openModal(project)}
            className="rounded-lg border border-white/5 bg-transparent px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cool-gray hover:bg-white/5 font-mono"
          >
            Inspect Sequence
          </button>
        </div>
      )}
    </motion.article>
  );
}

function FeaturedProjectsSection({ featuredProjects, openCaseStudy }) {
  const [leadProject, ...supportingProjects] = featuredProjects;

  const renderCaseStudy = (project) => {
    if (project.id === "waste-wise") {
      return (
        <Link
          to="/case-studies/waste-wise"
          className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-cool-gray hover:bg-white/10 font-mono transition-all"
        >
          Inspect Module
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
      className={`relative group rounded-2xl border border-white/10 bg-slate-900/40 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-electric-cyan/40 hover:shadow-cyan-900/20 ${
        isLead ? "p-8" : "p-6"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-[inner_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-x-0 top-0 z-20 flex h-7 items-center gap-1.5 border-b border-white/10 bg-slate-950/90 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="ml-auto flex gap-2">
             <div className="h-1 w-8 rounded-full bg-slate-800" />
             <div className="h-1 w-4 rounded-full bg-slate-800" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none z-10" />
        <iframe
          title={`${project.title} preview`}
          src={project.liveUrl}
          className={`w-full border-0 pt-7 grayscale-[0.2] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02] ${isLead ? "h-[24rem] md:h-[30rem]" : "h-64 md:h-72"}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="relative z-10">
        <h3 className={`mt-6 font-bold text-white tracking-tight ${isLead ? "text-3xl md:text-4xl" : "text-2xl"}`}>{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cool-gray font-light md:text-base">{project.problem}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/5 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider font-mono text-cyan-300/80">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-cyan-400/30 bg-electric-cyan/10 px-4 py-2 text-xs font-semibold text-pale-mint transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            Access Module
          </a>
          {renderCaseStudy(project)}
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-xs font-medium text-cool-gray transition-all hover:bg-white/5 hover:text-white"
          >
            Source Logic
          </a>
        </div>
      </div>
    </motion.article>
  );

  return (
    <motion.section
      variants={fadeUp}
      id="featured-projects"
      className={`${cardBase} lg:col-span-4 overflow-hidden relative`}
      aria-label="Validated system modules section"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg width="120" height="120" viewBox="0 0 100 100" className="text-electric-cyan">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M50 10 V90 M10 50 H90" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="mb-8 flex flex-col gap-2 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-electric-cyan font-mono">Technical Specimen Gallery</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl tracking-tight">VALIDATED SYSTEM MODULES</h2>
        <p className="max-w-3xl text-base text-cool-gray/90 leading-relaxed font-light">
          A curated library of technical assets demonstrating <span className="text-emerald-300 font-medium">synthesized logic</span> across complex datasets and secure MERN workflows.
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
      <div className="mb-6 flex items-end justify-between gap-3 relative z-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neon-petri font-mono">Experimental R&D</p>
          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl tracking-tight">Lab Experiments</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono text-cool-gray uppercase tracking-wider">
          {experiments.length} Specimens
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {experiments.map((item) => (
          <article
            key={item.id}
            className="group relative rounded-xl border border-white/10 bg-slate-900/30 p-4 transition-all duration-300 hover:border-emerald-400/30 hover:bg-slate-900/50"
          >
            <h3 className="text-sm font-semibold text-white tracking-tight">{item.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-cool-gray font-light">{item.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[9px] font-mono text-emerald-300/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={item.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center rounded-md border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[10px] font-semibold text-emerald-200 transition-all hover:bg-emerald-400/10"
            >
              Inspect Sequence
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
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl md:p-10 relative">
        <div className="absolute top-0 left-0 p-6 opacity-5 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100" className="text-neon-petri">
             <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <path d="M10 50 H90 M50 10 V90" stroke="currentColor" strokeWidth="0.2" />
          </svg>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between relative z-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-electric-cyan font-mono mb-2">Protocol: Communication</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl tracking-tight">Let's Synthesize Something.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cool-gray font-light">
              I work with teams that care about <span className="text-cyan-300">clear product thinking</span> and <span className="text-emerald-300">reliable engineering</span>. Reach out through any verified channel below.
            </p>
          </div>

          <a
            href={`mailto:${channels.email}`}
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-electric-cyan/40 bg-electric-cyan/10 px-8 py-4 text-sm font-bold text-cyan-50 shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all hover:bg-cyan-400/20 hover:scale-[1.02]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Initialize Session
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.id === "email" ? undefined : "_blank"}
              rel={item.id === "email" ? undefined : "noopener noreferrer"}
              className="group rounded-xl border border-white/5 bg-slate-900/30 p-4 text-sm text-slate-100 transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-900/50"
            >
              <div className="flex items-center gap-2">
                <span className={`${item.accent}`}>{item.icon}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono group-hover:text-electric-cyan transition-colors">{item.label}</span>
              </div>
              <span className="mt-2 block font-medium text-slate-200 group-hover:text-white font-mono">{item.value}</span>
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
        <span className="text-[10px] uppercase tracking-[0.2em] text-cool-gray font-mono">{label}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${accent} ${accent.includes('cyan') ? 'animate-pulse-cyan' : 'animate-pulse-emerald'}`} />
      </div>
      <div className="mt-3 text-3xl font-semibold leading-none text-white font-mono tracking-tight">{displayValue}</div>
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
        <p className="text-[10px] uppercase tracking-[0.2em] text-cool-gray font-mono">Validation Protocol</p>
        <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl tracking-tight">SYSTEMS VALIDATION</h2>
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

function VisionStack() {
  const visionModules = [
    {
      id: "agentic-ai",
      title: "Agentic AI Synthesis",
      description: "Autonomous task execution, self-correcting code, and LLM-driven cognitive logic for industrial ecosystems.",
      status: "ENCRYPTED"
    },
    {
      id: "autonomous-data",
      title: "Autonomous Data Architecture",
      description: "Self-evolving schemas, real-time bio-data synthesis, and predictive modeling for autonomous systems.",
      status: "ENCRYPTED"
    }
  ];

  return (
    <motion.section 
      variants={fadeUp} 
      className={`${cardBase} lg:col-span-4 mt-8 relative overflow-hidden bg-[#050505]`}
      aria-label="Vision stack section"
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
         <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="0.5">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
            <path d="M12 6V18M6 12H18" />
         </svg>
      </div>

      <div className="mb-8 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-neon-petri font-mono font-bold">[ VISION TECHNOLOGIES // PHASE: SYNTHESIS ]</p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl tracking-tight uppercase">Unlocking Next-Gen Infrastructure</h2>
        <p className="mt-3 max-w-2xl text-base text-cool-gray font-light leading-relaxed">
          Architecting the next evolution of autonomous systems. Currently synthesizing <span className="text-neon-petri font-medium">agentic workflows</span> for industrial-scale deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 relative z-10">
        {visionModules.map((module) => (
          <div 
            key={module.id}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-700 hover:border-white/20 hover:bg-white/[0.08] hover:backdrop-blur-lg overflow-hidden"
          >
            {/* Security Scan Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-neon-petri/40 shadow-[0_0_15px_#39FF14] opacity-0 group-hover:opacity-100 animate-scan z-20 pointer-events-none" />

            {/* Center Lock/Helix Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-700 scale-150">
               <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                  <path d="M12 11V14M8 11V14M16 11V14" />
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" />
               </svg>
            </div>

            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <span className="h-1.5 w-1.5 rounded-full bg-neon-petri animate-pulse-emerald shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
                 <span className="text-[10px] font-mono text-neon-petri font-bold tracking-[0.2em]">[ STATUS: {module.status} ]</span>
               </div>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-electric-cyan transition-colors duration-300 font-mono">{module.title}</h3>
            <p className="text-sm text-cool-gray leading-relaxed font-light">{module.description}</p>
            
            <div className="mt-8 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
               <span className="text-[9px] font-mono text-cool-gray uppercase tracking-widest">Protocol Secured</span>
               <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function TechStackSection({ categories }) {
  return (
    <motion.section variants={fadeUp} className={`${cardBase} lg:col-span-4`} aria-label="Tech stack section">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-electric-cyan font-mono">Synthesized Capability</p>
        <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl tracking-tight">TECH STACK</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.title}
            className="group rounded-xl border border-white/5 bg-slate-900/30 p-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-900/50"
          >
            <div className={`mb-4 rounded-lg bg-gradient-to-r ${category.accent} px-3 py-2 border border-white/5`}>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-medium text-cool-gray transition-all group-hover:bg-white/10 group-hover:text-cyan-200"
                >
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-cyan-400/30 bg-electric-cyan/10 px-1 text-[9px] font-bold text-electric-cyan font-mono">
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
            <p className="text-xs text-cool-gray">Switch desktop and mobile framing.</p>
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
              device === "desktop" ? "border-cyan-300/35 bg-electric-cyan/10 text-cyan-200" : "border-white/15 text-cool-gray"
            }`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`rounded-md border px-3 py-1 text-xs ${
              device === "mobile" ? "border-cyan-300/35 bg-electric-cyan/10 text-cyan-200" : "border-white/15 text-cool-gray"
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

        <p className="mt-3 text-xs text-cool-gray">
          If a project blocks embedding via iframe security headers, use the Live Preview button to open it in a new tab.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const heroProject = projects.find((project) => project.id === "waste-wise") || projects[0];
  const [mobileMode, setMobileMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectTechnologies = useMemo(() => [...new Set(projects.flatMap((project) => project.tags))], []);
  const featuredProjects = useMemo(() => {
    const featuredById = {
      "waste-wise": {
        problem: "Optimizes environmental impact by synthesizing AI-driven insights for efficient waste management cycles."
      },
      "zohaib-path": {
        problem: "Synchronizes architectural milestones with biological data streams to provide a unified growth trajectory."
      },
      "study-converter": {
        problem: "Resolves data fragmentation by providing a clinical interface for converting and normalizing educational datasets."
      }
    };

    const order = ["waste-wise", "zohaib-path", "study-converter"];

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
      { label: "Production Modules Deployed", value: projects.length, accent: "bg-cyan-300" },
      {
        label: "Tech-Stacks Synthesized",
        value: new Set([...stack, ...visionTech, ...projectTechnologies]).size,
        accent: "bg-emerald-300"
      },
      {
        label: "Active Systems Monitored",
        value: projects.filter((project) => Boolean(project.liveUrl)).length,
        accent: "bg-cyan-300"
      },
      { label: "Verified Repositories", value: 24, accent: "bg-emerald-300" }
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
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 md:px-8 md:py-10 lab-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.1),transparent_35%),radial-gradient(circle_at_88%_82%,rgba(52,211,153,0.1),transparent_35%)]" />

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
              <p className="text-[10px] uppercase tracking-[0.25em] text-electric-cyan/80 font-mono mb-2">Scientific Architect // v2.0</p>
              <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl tracking-tight text-white">
                ENGINEERING LIFE INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">DIGITAL STRUCTURES.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cool-gray/90 font-light">
                Architecting the intersection of <span className="text-emerald-300/90 font-medium">Biological Data</span> and <span className="text-cyan-300/90 font-medium">Scalable MERN Systems</span>. We deliver battle-tested digital infrastructure for the modern web.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#featured-projects"
                  className="inline-flex items-center justify-center rounded-xl border border-cyan-300/30 bg-electric-cyan/10 px-6 py-3 text-sm font-semibold text-pale-mint transition duration-300 hover:bg-cyan-400/20 hover:border-cyan-300/50 shadow-[0_0_20px_rgba(34,211,238,0.15)] focus:outline-none"
                >
                  Explore System Library
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:bg-white/10 hover:border-white/20 focus:outline-none"
                >
                  Book a Systems Audit
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
                  <p className="mt-2 text-xs leading-relaxed text-cool-gray md:text-sm">{heroProject.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <EngineeringSnapshotSection metrics={engineeringMetrics} />

        <VisionStack />

        <FeaturedProjectsSection featuredProjects={featuredProjects} openCaseStudy={setSelectedProject} />

        <TechStackSection categories={techCategories} />

        <LabExperimentsSection experiments={labExperiments} />

      </motion.div>

      <ContactSection channels={contactChannels} />

      <PreviewModal project={selectedProject} closeModal={() => setSelectedProject(null)} />
    </section>
  );
}
