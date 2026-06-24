"use client";

import { motion } from "framer-motion";
import {
  RiBriefcaseLine,
  RiTeamLine,
  RiMapPinLine,
  RiTimeLine,
  RiCalendarLine,
  RiCodeSSlashLine,
} from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";
import { type ExpEntry, type ExpLabel } from "@/lib/data";

/* ─── HUD corner brackets ────────────────────────────────────────────────── */
function HudCorners({ dim = false }: { dim?: boolean }) {
  const opacity = dim ? "opacity-30" : "opacity-50";
  const base = `absolute w-3 h-3 border-accent pointer-events-none ${opacity} transition-opacity duration-300`;
  return (
    <>
      <div className={`${base} top-0 left-0   border-t border-l`} />
      <div className={`${base} top-0 right-0  border-t border-r`} />
      <div className={`${base} bottom-0 left-0  border-b border-l`} />
      <div className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/* ─── Diamond timeline node ──────────────────────────────────────────────── */
function DiamondNode({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 shrink-0 z-10">
      {active && (
        <>
          <motion.span
            className="absolute w-5 h-5 rotate-45 border border-accent"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute w-5 h-5 rotate-45 border border-accent"
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
          />
        </>
      )}
      <div
        className={`relative w-[14px] h-[14px] rotate-45 border-2 border-accent bg-bg transition-shadow ${
          active ? "shadow-glow" : "opacity-60"
        }`}
      >
        {active && <div className="absolute inset-[2px] bg-accent" />}
      </div>
    </div>
  );
}

/* ─── Label badge colours ────────────────────────────────────────────────── */
const LABEL_STYLE: Record<ExpLabel, string> = {
  Internship:  "border-border-accent text-accent",
  "Full-time": "border-[#22d3ee] text-[#22d3ee]",
  "Part-time": "border-[#a855f7] text-[#a855f7]",
  Freelance:   "border-[#eab308] text-[#eab308]",
  Contract:    "border-[#f97316] text-[#f97316]",
  Leadership:  "border-[#10b981] text-[#10b981]",
};

/* ─── Entry card ─────────────────────────────────────────────────────────── */
function EntryCard({ entry, index }: { entry: ExpEntry; index: number }) {
  const isCurrent = entry.type === "current";
  const isLeadership = entry.label === "Leadership";
  const RoleIcon = isLeadership ? RiTeamLine : RiBriefcaseLine;

  return (
    <motion.div
      className="flex-1 min-w-0 mb-8"
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.13 }}
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`relative rounded-2xl bg-bg-card overflow-hidden border transition-all duration-300 group ${
          isCurrent
            ? "border-border-accent hover:shadow-glow"
            : "border-border hover:border-border-accent"
        }`}
      >
        <HudCorners dim={!isCurrent} />

        {isCurrent && (
          <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        )}

        {/* ── Card header ──────────────────────────────────────────── */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-2 sm:gap-3">

            {/* Left: role + company + location */}
            <div className="min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <RoleIcon size={16} className="text-accent shrink-0 mt-[3px]" />
                <h3 className="font-semibold text-[15px] leading-snug">{entry.role}</h3>
              </div>
              <p className="text-accent-alt text-sm font-medium ml-6">{entry.company}</p>
              <p className="flex items-center gap-1 text-fg-muted text-xs mt-0.5 ml-6">
                <RiMapPinLine size={11} className="text-accent shrink-0" />
                {entry.location}
              </p>
            </div>

            {/* Right: period + badges */}
            <div className="flex flex-col items-start sm:items-end gap-1.5 ml-6 sm:ml-0">
              <span className="flex items-center gap-1.5 font-mono text-xs border border-border-accent text-accent px-3 py-1 rounded-full">
                <RiCalendarLine size={11} />
                {entry.period}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-mono border px-2.5 py-[3px] rounded-full ${
                    LABEL_STYLE[entry.label]
                  }`}
                >
                  {entry.label}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-fg-muted border border-border px-2.5 py-[3px] rounded-full">
                  <RiTimeLine size={9} />
                  {entry.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Gradient divider ─────────────────────────────────────── */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border-accent to-transparent opacity-60" />

        {/* ── Bullet points ────────────────────────────────────────── */}
        <ul className="px-5 pt-4 pb-4 space-y-2.5">
          {entry.points.map((pt, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.3 + index * 0.1 + j * 0.07 }}
              className="flex gap-2.5 text-sm text-fg-muted leading-relaxed"
            >
              <span className="text-accent shrink-0 mt-[3px] text-xs">▸</span>
              {pt}
            </motion.li>
          ))}
        </ul>

        {/* ── Gradient divider ─────────────────────────────────────── */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border-accent to-transparent opacity-40" />

        {/* ── Stack / Areas ────────────────────────────────────────── */}
        <div className="px-5 pt-3 pb-5">
          <p className="flex items-center gap-1.5 text-[9px] font-mono text-fg-muted tracking-[0.15em] mb-2">
            <RiCodeSSlashLine size={10} className="text-accent" />
            {isLeadership ? "AREAS" : "STACK"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {entry.stack.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.12 }}
                className="text-[11px] px-2.5 py-[5px] rounded-full border border-border-accent text-accent bg-bg-secondary cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {isCurrent && (
          <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Shared timeline section ─────────────────────────────────────────────── */
interface Props {
  entries: ExpEntry[];
  title: string;
  sectionId: string;
}

export default function TimelineSection({ entries, title, sectionId }: Props) {
  return (
    <section id={sectionId} className="py-24 px-4 max-w-4xl mx-auto">
      <SectionHeading title={title} />

      <div className="relative mt-12">

        {/* Glowing vertical spine */}
        <motion.div
          className="absolute left-5 top-2 bottom-2 w-px pointer-events-none"
          style={{
            originY: 0,
            background:
              "linear-gradient(to bottom, var(--accent) 0%, var(--accent-alt) 55%, transparent 100%)",
            boxShadow: "0 0 10px var(--accent-glow), 0 0 2px var(--accent)",
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {/* Flowing energy pulse on spine */}
        <motion.div
          className="absolute left-[19px] w-[3px] h-12 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--accent), transparent)",
            boxShadow: "0 0 6px var(--accent)",
            filter: "blur(1px)",
          }}
          animate={{ top: ["-3rem", "calc(100% + 3rem)"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        />

        {/* Entries */}
        <div>
          {entries.map((entry, i) => (
            <div key={entry.id} className="flex gap-4 items-start">
              <DiamondNode active={entry.type === "current"} />
              <EntryCard entry={entry} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
