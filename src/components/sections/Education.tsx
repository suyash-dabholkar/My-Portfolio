"use client";

import { motion } from "framer-motion";
import {
  RiGraduationCapLine,
  RiMapPinLine,
  RiMedalLine,
  RiBookOpenLine,
  RiCalendarLine,
} from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";

/* ─── Data ───────────────────────────────────────────────────────────────── */
interface EduEntry {
  id: string;
  type: "current" | "past";
  degree: string;
  institution: string;
  period: string;
  location?: string;
  status?: string;
  cgpa?: string;
  cgpaNum?: number;   // 0-100 for bar width
  board?: string;
  score?: string;
  courses?: string[];
  highlights?: string[];
}

const entries: EduEntry[] = [
  {
    id: "vit",
    type: "current",
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    period: "2022 – 2026",
    status: "3rd Year",
    cgpa: "9.xx / 10",
    cgpaNum: 94,
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Machine Learning",
      "Web Technologies",
    ],
    highlights: [
      "Dean's List — consecutive semesters",
      "Finalist — Smart India Hackathon 2024",
      "Core member — [Your Tech Club / Society]",
    ],
  },
  {
    id: "xii",
    type: "past",
    degree: "Class XII — Science (PCM + Computer Science)",
    institution: "Your School Name",
    period: "2020 – 2022",
    board: "CBSE",
    score: "XX.X%",
  },
  {
    id: "x",
    type: "past",
    degree: "Class X",
    institution: "Your School Name",
    period: "2018 – 2020",
    board: "CBSE",
    score: "XX.X%",
  },
];

/* ─── Timeline node with double-ring pulse ───────────────────────────────── */
function TimelineNode({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 shrink-0 z-10">
      {active && (
        <>
          <motion.span
            className="absolute rounded-full border border-accent"
            style={{ width: 32, height: 32 }}
            initial={{ scale: 0.55, opacity: 0.7 }}
            animate={{ scale: 2.1, opacity: 0 }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute rounded-full border border-accent"
            style={{ width: 32, height: 32 }}
            initial={{ scale: 0.55, opacity: 0.5 }}
            animate={{ scale: 2.1, opacity: 0 }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
          />
        </>
      )}

      {/* Ring */}
      <div
        className={`relative w-4 h-4 rounded-full border-2 border-accent bg-bg flex items-center justify-center transition-shadow ${
          active ? "shadow-glow" : ""
        }`}
      >
        {/* Inner dot */}
        <div
          className={`w-[6px] h-[6px] rounded-full bg-accent transition-opacity ${
            active ? "opacity-100" : "opacity-40"
          }`}
        />
      </div>
    </div>
  );
}

/* ─── VIT (current) card ─────────────────────────────────────────────────── */
function CurrentCard({ entry }: { entry: EduEntry }) {
  return (
    <div className="flex-1 min-w-0 rounded-2xl border border-border-accent bg-bg-card overflow-hidden mb-8">
      {/* Top accent stripe */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="p-5 sm:p-6 space-y-5">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-start gap-2 mb-1">
              <RiGraduationCapLine size={17} className="text-accent shrink-0 mt-0.5" />
              <h3 className="font-semibold text-[15px] leading-snug">{entry.degree}</h3>
            </div>
            <p className="text-accent-alt text-sm font-medium ml-[25px]">{entry.institution}</p>
            {entry.location && (
              <p className="flex items-center gap-1 text-fg-muted text-xs mt-0.5 ml-[25px]">
                <RiMapPinLine size={11} className="text-accent shrink-0" />
                {entry.location}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="flex items-center gap-1.5 font-mono text-xs border border-border-accent text-accent px-3 py-1 rounded-full">
              <RiCalendarLine size={11} />
              {entry.period}
            </span>
            {entry.status && (
              <motion.span
                className="text-[10px] font-mono font-bold bg-accent text-bg px-3 py-[3px] rounded-full"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {entry.status} ●
              </motion.span>
            )}
          </div>
        </div>

        {/* CGPA progress bar */}
        {entry.cgpa && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-fg-muted tracking-[0.15em]">CGPA</span>
              <span className="text-sm font-bold text-accent">{entry.cgpa}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent relative"
                style={{ boxShadow: "0 0 8px var(--accent-glow)" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${entry.cgpaNum ?? 90}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.45 }}
              >
                {/* Traveling shine on bar */}
                <motion.span
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ left: "-2rem" }}
                  whileInView={{ left: "110%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: "easeIn", delay: 1.6 }}
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* Core courses */}
        {entry.courses && (
          <div>
            <p className="text-[10px] font-mono text-fg-muted tracking-[0.15em] mb-2">
              CORE COURSES
            </p>
            <div className="flex flex-wrap gap-1.5">
              {entry.courses.map((c) => (
                <motion.span
                  key={c}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.12 }}
                  className="text-[11px] px-2.5 py-[5px] rounded-full border border-border-accent text-accent bg-bg-secondary cursor-default"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {entry.highlights && (
          <div>
            <p className="text-[10px] font-mono text-fg-muted tracking-[0.15em] mb-2 flex items-center gap-1.5">
              <RiMedalLine size={11} className="text-accent" />
              HIGHLIGHTS
            </p>
            <ul className="space-y-1.5">
              {entry.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-fg-muted">
                  <span className="text-accent mt-[3px] shrink-0 text-xs">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom accent stripe */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </div>
  );
}

/* ─── School entry card ──────────────────────────────────────────────────── */
function PastCard({ entry }: { entry: EduEntry }) {
  return (
    <div className="flex-1 min-w-0 rounded-xl border border-border bg-bg-card p-4 mb-6 hover:border-border-accent transition-colors duration-300">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-start gap-2">
            <RiBookOpenLine size={13} className="text-accent shrink-0 mt-[3px]" />
            <h3 className="font-medium text-sm leading-snug">{entry.degree}</h3>
          </div>
          <p className="text-xs text-fg-muted mt-0.5 ml-5">{entry.institution}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {entry.board && (
            <span className="text-[10px] border border-border text-fg-muted px-2 py-0.5 rounded-full">
              {entry.board}
            </span>
          )}
          {entry.score && (
            <span className="text-sm font-bold text-accent">{entry.score}</span>
          )}
          <span className="text-[10px] font-mono text-fg-muted">{entry.period}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Education() {
  return (
    <section id="education" className="py-24 px-4 max-w-4xl mx-auto">
      <SectionHeading title="Education" />

      <div className="relative mt-12">

        {/* ── Glowing vertical spine ───────────────────────────────── */}
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

        {/* ── Flowing energy dot on spine ──────────────────────────── */}
        <motion.div
          className="absolute left-[19px] w-[3px] h-12 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--accent), transparent)",
            boxShadow: "0 0 6px var(--accent)",
            filter: "blur(1px)",
          }}
          animate={{ top: ["-3rem", "calc(100% + 3rem)"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
        />

        {/* ── Entries ──────────────────────────────────────────────── */}
        <div>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.13 }}
              className="flex gap-4 items-start"
            >
              <TimelineNode active={entry.type === "current"} />

              {entry.type === "current" ? (
                <CurrentCard entry={entry} />
              ) : (
                <PastCard entry={entry} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
