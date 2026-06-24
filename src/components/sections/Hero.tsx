"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownLine, RiDownload2Line, RiArrowRightUpLine } from "react-icons/ri";
import ParticlesCanvas from "@/components/ui/ParticlesCanvas";

/* ─── Typing sequence hook ───────────────────────────────────────────────── */
interface Step {
  text?: string;
  speed?: number;      // ms per character
  pauseAfter?: number; // ms to pause after done
  startDelay?: number; // ms before first character
  isProgress?: boolean;
}

function useTypedSequence(initSteps: Step[]) {
  const steps = useRef(initSteps).current;
  const [idx, setIdx] = useState(-1);
  const [lines, setLines] = useState(() => initSteps.map(() => ""));
  const [done, setDone] = useState(false);

  // auto-start after mount
  useEffect(() => {
    const t = setTimeout(() => setIdx(0), 0);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (idx < 0) return;
    if (idx >= steps.length) { setDone(true); return; }

    const step = steps[idx];

    // Progress-bar step: just wait, then advance
    if (step.isProgress || !step.text) {
      const t = setTimeout(() => setIdx(i => i + 1), step.pauseAfter ?? 1200);
      return () => clearTimeout(t);
    }

    const text = step.text;
    let char = 0;
    let typeT: ReturnType<typeof setTimeout>;
    let pauseT: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      char++;
      setLines(prev => {
        const n = [...prev];
        n[idx] = text.slice(0, char);
        return n;
      });
      if (char < text.length) {
        typeT = setTimeout(typeNext, step.speed ?? 50);
      } else {
        pauseT = setTimeout(() => setIdx(i => i + 1), step.pauseAfter ?? 200);
      }
    };

    const startT = setTimeout(typeNext, step.startDelay ?? 0);
    return () => { clearTimeout(startT); clearTimeout(typeT); clearTimeout(pauseT); };
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  return { lines, done, idx };
}

/* ─── Blinking cursor ────────────────────────────────────────────────────── */
function Cursor({ show, height }: { show: boolean; height: string }) {
  if (!show) return null;
  return (
    <span
      className={`inline-block w-[0.5em] ${height} bg-current ml-[3px] align-middle`}
      aria-hidden
    />
  );
}

/* ─── HUD frame (corners + scan line + status labels) ───────────────────── */
function HudFrame() {
  const corners = [
    { pos: "top-5 left-5",     border: "border-t border-l", init: { x: -8, y: -8 }, delay: 0.1 },
    { pos: "top-5 right-5",    border: "border-t border-r", init: { x: 8, y: -8 },  delay: 0.22 },
    { pos: "bottom-5 right-5", border: "border-b border-r", init: { x: 8, y: 8 },   delay: 0.34 },
    { pos: "bottom-5 left-5",  border: "border-b border-l", init: { x: -8, y: 8 },  delay: 0.46 },
  ];

  const labels = [
    { text: "SYS : ONLINE",            pos: "top-[22px] left-[72px]" },
    { text: "HUD : ACTIVE",            pos: "top-[22px] right-[72px]" },
    { text: "LAT 18.52°N  LNG 73.86°E", pos: "bottom-[22px] left-[72px]" },
    { text: "STARK.AI v2.4",           pos: "bottom-[22px] right-[72px]" },
  ];

  return (
    <>
      {/* One-pass vertical scan line */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg,transparent 5%,var(--accent) 50%,transparent 95%)",
          opacity: 0.55,
        }}
        initial={{ top: 0 }}
        animate={{ top: "100%" }}
        transition={{ duration: 2.8, ease: "linear", delay: 0.15 }}
      />

      {/* Corner L-brackets */}
      {corners.map((c, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`absolute w-9 h-9 border-accent pointer-events-none ${c.pos} ${c.border}`}
          initial={{ ...c.init, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 0.55 }}
          transition={{ duration: 0.5, delay: c.delay, ease: "easeOut" }}
        />
      ))}

      {/* Status micro-labels — hidden below sm */}
      {labels.map(({ text, pos }, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`absolute hidden sm:block ${pos} font-mono text-[8px] text-accent tracking-[0.14em] pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.38 }}
          transition={{ delay: 0.85 + i * 0.1 }}
        >
          {text}
        </motion.span>
      ))}
    </>
  );
}

/* ─── Boot sequence data ─────────────────────────────────────────────────── */
const STEPS: Step[] = [
  //  idx 0-2 : diagnostic lines
  { text: "> STARK.AI BOOT SEQUENCE INITIATED",    speed: 20, pauseAfter: 80,  startDelay: 450 },
  { text: "> Loading neural interface modules...", speed: 24, pauseAfter: 80 },
  { text: "> All systems nominal.  HUD online.",   speed: 24, pauseAfter: 200 },
  //  idx 3   : progress bar (no text, just a timed pause)
  { isProgress: true, pauseAfter: 1280 },
  //  idx 4-6 : JARVIS identity lines
  { text: "Initializing...",         speed: 65, pauseAfter: 680 },
  { text: "Welcome.",                speed: 95, pauseAfter: 380 },
  { text: "I am Suyash Dabholkar.", speed: 55, pauseAfter: 950 },
];

const PROGRESS_IDX = 3;

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { lines, done, idx } = useTypedSequence(STEPS);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  const progressStarted = idx >= PROGRESS_IDX;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16"
    >
      {/* Background layers */}
      <ParticlesCanvas />
      <HudFrame />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-6">

        {/* ── 1. Diagnostic boot lines ─────────────────────────────── */}
        <div className="w-full font-mono text-[11px] sm:text-[12px] text-accent opacity-75 space-y-[3px] text-left">

          {/* Text lines (indices 0-2) */}
          {[0, 1, 2].map(i => {
            const text = lines[i];
            if (!text && idx < i) return null;
            return (
              <div key={i} className="min-h-[1.4em] flex items-center leading-none">
                <span>{text}</span>
                <Cursor show={idx === i && cursor} height="h-[11px]" />
              </div>
            );
          })}

          {/* Progress bar — appears when step 3 starts */}
          {progressStarted && (
            <div className="flex items-center gap-2 pt-[2px]">
              <span aria-hidden>{">"}</span>
              <div className="w-36 h-[4px] rounded-sm bg-bg-secondary border border-border-accent overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-sm"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.88, ease: "easeInOut" }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.84 }}
              >
                100%
              </motion.span>
            </div>
          )}
        </div>

        {/* ── 2. Identity sequence ─────────────────────────────────── */}
        <div className="w-full space-y-2">

          {/* "Initializing..." */}
          {lines[4] && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm sm:text-base text-fg-muted tracking-[0.2em]"
            >
              {lines[4]}
              <Cursor show={idx === 4 && cursor} height="h-[14px]" />
            </motion.p>
          )}

          {/* "Welcome." */}
          {lines[5] && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-2xl sm:text-3xl md:text-4xl text-accent"
            >
              {lines[5]}
              <Cursor show={idx === 5 && cursor} height="h-[0.9em]" />
            </motion.p>
          )}

          {/* "I am Suyash Dabholkar." */}
          {lines[6] && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-glow leading-[1.05]"
            >
              {lines[6]}
              <Cursor show={idx === 6 && cursor} height="h-[0.85em]" />
            </motion.h1>
          )}
        </div>

        {/* ── 3. CTA — fades in after sequence finishes ────────────── */}
        <AnimatePresence>
          {done && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-4 w-full"
            >
              <p className="text-base sm:text-lg md:text-xl text-fg-muted">
                AI &amp; ML · Robotics · Full-Stack
              </p>
              <p className="text-sm text-fg-muted max-w-md mx-auto">
                Building data-driven solutions at the intersection of intelligent software and hardware.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <a
                  href="#projects"
                  className="btn-accent px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                >
                  View Work <RiArrowRightUpLine size={15} aria-hidden />
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-6 py-3 border border-border-accent text-accent rounded-lg font-medium hover:shadow-glow transition-shadow"
                >
                  <RiDownload2Line size={15} aria-hidden /> Download Résumé
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll arrow */}
      <AnimatePresence>
        {done && (
          <motion.a
            key="scroll"
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.85 }}
            className="absolute bottom-8 text-accent animate-bounce"
            aria-label="Scroll to next section"
          >
            <RiArrowDownLine size={22} />
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}
