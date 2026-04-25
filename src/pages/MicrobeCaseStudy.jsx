import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    id: "problem",
    title: "01. THE PROBLEM",
    body: [
      "Urban environments face an exponential crisis in waste management efficiency, with fragmented data leads to significant ecological friction.",
      "Traditional systems lack real-time synthesis of waste types, volumes, and logistical optimization.",
      "The core architectural challenge was creating a deterministic logic engine to normalize diverse sustainability data points into actionable insights."
    ]
  },
  {
    id: "product-idea",
    title: "02. SYSTEM SYNTHESIS",
    body: [
      "WasteWise was architected as an AI-powered sustainability engine rather than a static tracking tool.",
      "The system focuses on high-velocity data processing to optimize environmental impact cycles.",
      "Biological precision was applied to the UI to ensure complex technical specimens (data) remain readable and actionable."
    ]
  },
  {
    id: "architecture",
    title: "03. ARCHITECTURAL PROTOCOL",
    body: [
      "Built on a robust MERN-stack foundation with an emphasis on scalable digital infrastructure.",
      "The architecture utilizes a clinical data layer to maintain high integrity across sustainability datasets.",
      "React server-side logic handles complex normalized mapping, while the frontend provides a high-performance laboratory interface."
    ]
  },
  {
    id: "tech-stack",
    title: "04. TECH STACK (SYNTHESIZED)",
    body: [
      "React // Component Protocol for reactive state orchestration.",
      "AI Engine // Custom logic wrappers for sustainability forecasting.",
      "Vite // High-velocity development and deployment pipeline.",
      "Tailwind CSS // Laboratory grid system for structural precision.",
      "Framer Motion // Biological transitions for organic feedback cycles."
    ]
  },
  {
    id: "performance",
    title: "05. SYSTEMS VALIDATION",
    body: [
      "Rigorous performance testing ensures the engine maintains low latency during peak data ingestion.",
      "Verified repositories and battle-tested deployment paths guarantee system reliability.",
      "Integrated health monitoring tracks the active status of all environmental sensors and API nodes."
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function WasteWiseCaseStudy() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-cool-gray md:px-8 md:py-10 lab-grid font-sans selection:bg-electric-cyan/10">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(34,211,238,0.1),transparent_35%),radial-gradient(circle_at_86%_78%,rgba(52,211,153,0.1),transparent_35%)]" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="mx-auto max-w-5xl"
      >
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <svg width="150" height="150" viewBox="0 0 100 100" className="text-electric-cyan">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                <path d="M50 10 V90 M10 50 H90" stroke="currentColor" strokeWidth="0.2" />
             </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-electric-cyan font-mono">System Deep-Dive // WW-01</p>
            <Link
              to="/"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-cool-gray transition-all hover:bg-white/10 hover:text-white font-mono"
            >
              Terminate Session
            </Link>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            WasteWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 text-neon-petri">Engine.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cool-gray font-light">
            A comprehensive systems validation report on the product rationale, protocol architecture, and engineering synthesis behind the WasteWise sustainability engine.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4 border-l-2 border-l-cyan-400">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">Designation</p>
              <p className="mt-1 text-sm font-bold text-white uppercase tracking-tight">Lead Systems Architect</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4 border-l-2 border-l-emerald-400">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">Primary Protocol</p>
              <p className="mt-1 text-sm font-bold text-white uppercase tracking-tight">AI Insight Synthesis</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4 border-l-2 border-l-cyan-400">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">Deployment</p>
              <p className="mt-1 text-sm font-bold text-white uppercase tracking-tight">Google Cloud Run</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 space-y-4">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              variants={fadeUp}
              className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-slate-900/30"
            >
              <h2 className="text-sm font-bold text-electric-cyan tracking-[0.15em] font-mono mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-base leading-relaxed text-cool-gray font-light md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div 
          variants={fadeUp}
          className="mt-8 mb-12 text-center"
        >
          <a
            href="https://wastewise-72852433259.us-west1.run.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-emerald-400/30 bg-neon-petri/10 px-8 py-4 text-sm font-bold text-pale-mint shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all hover:bg-emerald-400/20 hover:scale-[1.02]"
          >
            Access Live Engine
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
