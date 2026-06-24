"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  RiGithubLine,
  RiExternalLinkLine,
  RiCodeSSlashLine,
  RiRefreshLine,
} from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS, type ProjectItem } from "@/lib/data";

/* ─── Screenshot placeholder ─────────────────────────────────────────────── */
function Placeholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary overflow-hidden">
      {/* HUD grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.05) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(0,240,255,0.05) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Pulsing ring */}
      <div className="relative z-10 w-14 h-14">
        <motion.span
          className="absolute inset-0 rounded-full border border-accent opacity-20"
          animate={{ scale: [1, 1.55], opacity: [0.2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="absolute inset-[10px] rounded-full border border-accent opacity-35 flex items-center justify-center">
          <RiCodeSSlashLine size={18} className="text-accent opacity-55" />
        </div>
      </div>
      <p className="mt-3 font-mono text-[7.5px] text-accent opacity-30 tracking-[0.24em] z-10">
        PREVIEW.PNG
      </p>
    </div>
  );
}

/* ─── HUD corner L-brackets ──────────────────────────────────────────────── */
function HudCorners() {
  return (
    <>
      <div className="absolute top-0 left-0   w-[14px] h-[14px] border-t-2 border-l-2 border-accent pointer-events-none" />
      <div className="absolute top-0 right-0  w-[14px] h-[14px] border-t-2 border-r-2 border-accent pointer-events-none" />
      <div className="absolute bottom-0 left-0  w-[14px] h-[14px] border-b-2 border-l-2 border-accent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[14px] h-[14px] border-b-2 border-r-2 border-accent pointer-events-none" />
    </>
  );
}

/* ─── Flip card ──────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [imgErr, setImgErr]   = useState(false);

  // On touch screens, toggle on click instead of hover
  const [touchMode, setTouchMode] = useState(false);
  useEffect(() => {
    setTouchMode(window.matchMedia("(hover: none)").matches);
  }, []);

  const flip   = () => setFlipped(true);
  const unflip = () => setFlipped(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="w-full"
      style={{ perspective: "1100px" }}
      onMouseEnter={touchMode ? undefined : flip}
      onMouseLeave={touchMode ? undefined : unflip}
      onClick={touchMode ? toggle : undefined}
    >
      {/* Flipping inner */}
      <motion.div
        className="relative w-full aspect-[4/5]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
      >

        {/* ══════════════════ FRONT ══════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-border-accent"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as React.CSSProperties}
        >
          {/* Screenshot / placeholder */}
          <div className="absolute inset-0">
            {!imgErr && project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                className="object-cover"
                onError={() => setImgErr(true)}
              />
            ) : (
              <Placeholder />
            )}
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "58%",
              background:
                "linear-gradient(to top,var(--bg) 0%,var(--bg-card) 35%,transparent 100%)",
            }}
          />

          {/* Text overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 z-10">
            <p className="font-mono text-[8.5px] text-accent tracking-[0.18em] mb-1 opacity-75">
              {project.tagline.toUpperCase()}
            </p>
            <h3 className="font-bold text-[17px] leading-tight mb-3">{project.name}</h3>

            {/* Stack preview */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-2 py-[3px] rounded-full border border-border-accent text-accent bg-bg-card/60 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-[9px] px-2 py-[3px] rounded-full border border-border text-fg-muted">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Flip-hint icon */}
          <div className="absolute top-3 right-3 z-10">
            <RiRefreshLine size={13} className="text-accent opacity-35" />
          </div>
        </div>

        {/* ══════════════════ BACK ═══════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-border-accent"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--bg-card)",
            boxShadow:
              "0 0 28px var(--accent-glow), inset 0 0 28px var(--accent-glow)",
          } as React.CSSProperties}
        >
          {/* Holographic scan lines */}
          <div aria-hidden className="holo-scanlines absolute inset-0 pointer-events-none z-0" />

          {/* Diagonal colour tint */}
          <div aria-hidden className="holo-tint absolute inset-0 pointer-events-none z-0" />

          {/* Travelling shimmer sweep */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-2/5 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(90deg,transparent,var(--accent-glow),transparent)",
            }}
            animate={{ x: ["-150%", "350%"] }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.8,
            }}
          />

          {/* HUD corner brackets */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HudCorners />
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col h-full p-5">

            {/* Header */}
            <div className="mb-3">
              <p className="font-mono text-[8.5px] text-accent tracking-[0.18em] mb-1 opacity-70">
                {project.tagline.toUpperCase()}
              </p>
              <h3 className="font-bold text-[15px] leading-snug">{project.name}</h3>
              <div className="mt-2 h-px bg-gradient-to-r from-border-accent via-border-accent to-transparent" />
            </div>

            {/* Description */}
            <p className="text-fg-muted text-[12.5px] leading-relaxed flex-1 min-h-0 overflow-hidden">
              {project.description}
            </p>

            {/* Full stack */}
            <div className="mt-3 shrink-0">
              <p className="text-[8px] font-mono text-fg-muted tracking-[0.16em] mb-1.5">
                STACK
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2.5 py-[4px] rounded-full border border-border-accent text-accent bg-bg-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3 flex gap-2 shrink-0">
              {project.github !== "#" ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border-accent text-accent text-[11px] font-medium hover:bg-accent hover:text-bg hover:shadow-glow transition-all duration-200"
                >
                  <RiGithubLine size={13} />
                  GitHub
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center py-2 rounded-lg border border-border text-fg-muted text-[11px] opacity-40 cursor-default select-none">
                  No repo
                </div>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent text-bg text-[11px] font-medium hover:opacity-85 hover:shadow-glow transition-all duration-200"
                >
                  <RiExternalLinkLine size={13} />
                  Live Demo
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center py-2 rounded-lg border border-border text-fg-muted text-[11px] opacity-40 cursor-default select-none">
                  No demo
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
      <SectionHeading title="Projects" />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
