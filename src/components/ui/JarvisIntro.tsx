"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/* ─── Config ─────────────────────────────────────────────────────────────── */
const LINES = [
  "SYSTEM INITIALIZING...",
  "LOADING NEURAL MODULES...",
  "JARVIS PROTOCOL ACTIVE",
 
];
const CHAR_MS = 18;
const PAUSE_MS = 180;
const LAST_PAUSE_MS = 400;
const STORAGE_KEY = "jarvis-boot-v2";

const LEFT_DATA = [
  { label: "SYS.TEMP",   value: "28.4 °C"  },
  { label: "CPU.LOAD",   value: "97 %"      },
  { label: "NEURAL.NET", value: "ACTIVE"    },
  { label: "MEMORY",     value: "128 TB"    },
];
const RIGHT_DATA = [
  { label: "ARC.POWER",  value: "3.6 GW"   },
  { label: "SHIELD",     value: "STANDBY"  },
  { label: "REPULSOR",   value: "CHARGED"  },
  { label: "INTEGRITY",  value: "100 %"    },
];

/* ─── Floating particles ─────────────────────────────────────────────────── */
function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: ((i * 37 + 13) % 97) + 1.5,
        y: ((i * 53 + 7) % 95) + 2.5,
        r: ((i % 4) * 0.55 + 0.7),
        dur: 3 + (i % 6) * 0.6,
        delay: (i % 9) * 0.28,
        amp: 8 + (i % 5) * 4,
      })),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.r * 2, height: d.r * 2, background: "#00f0ff" }}
          animate={{ y: [-d.amp, d.amp, -d.amp], opacity: [0.06, 0.4, 0.06] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── SVG Arc Reactor ────────────────────────────────────────────────────── */
function ticks(r: number, n: number, inner: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return { x1: Math.cos(a) * inner, y1: Math.sin(a) * inner, x2: Math.cos(a) * r, y2: Math.sin(a) * r };
  });
}

function ArcReactor({ phase }: { phase: number }) {
  const lit  = phase >= 2;
  const full = phase >= 3;
  const glow = phase >= 5 ? 40 : full ? 18 : lit ? 6 : 2;
  const glowAlpha = phase >= 5 ? 1 : full ? 0.8 : lit ? 0.5 : 0.15;

  const c = "#00f0ff";
  const alpha = (a: number) => `rgba(0,240,255,${lit ? a : a * 0.18})`;

  return (
    <svg
      viewBox="-90 -90 180 180"
      width={200}
      height={200}
      style={{ filter: `drop-shadow(0 0 ${glow}px rgba(0,240,255,${glowAlpha}))`, overflow: "visible" }}
    >
      <defs>
        <radialGradient id="jr-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="35%"  stopColor={c} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Ring 1 — outermost, slow CW, 8 ticks */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle r={82} fill="none" stroke={alpha(0.2)} strokeWidth={0.75} />
        {ticks(82, 8, 76).map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={alpha(0.55)} strokeWidth={1.5} />
        ))}
      </motion.g>

      {/* Ring 2 — dashed, medium CCW */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle r={66} fill="none" stroke={alpha(0.35)} strokeWidth={1} strokeDasharray="4 7" />
      </motion.g>

      {/* Ring 3 — fast CW, 12 micro-ticks */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle r={50} fill="none" stroke={alpha(0.45)} strokeWidth={1} />
        {ticks(50, 12, 46).map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={alpha(0.5)} strokeWidth={1} />
        ))}
      </motion.g>

      {/* Ring 4 — inner, pulsing */}
      <motion.circle
        r={34}
        fill="none"
        stroke={alpha(0.9)}
        strokeWidth={2}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* Inner triangles — Iron Man arc reactor geometry */}
      {[0, 120, 240].map((deg) => (
        <polygon
          key={deg}
          transform={`rotate(${deg})`}
          points="0,-22 -6,-10 6,-10"
          fill={alpha(0.35)}
          stroke={alpha(0.5)}
          strokeWidth={0.5}
        />
      ))}

      {/* Connecting radial spokes */}
      {[30, 150, 270].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={Math.cos(r) * 10} y1={Math.sin(r) * 10}
            x2={Math.cos(r) * 22} y2={Math.sin(r) * 22}
            stroke={alpha(0.4)}
            strokeWidth={1}
          />
        );
      })}

      {/* Core glow */}
      <motion.circle
        r={10}
        fill="url(#jr-core)"
        animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

/* ─── HUD corner brackets ────────────────────────────────────────────────── */
function HudCorners({ show }: { show: boolean }) {
  const corners = [
    { cls: "top-5 left-5",     b: "border-t-2 border-l-2", ix: -60, iy: -60 },
    { cls: "top-5 right-5",    b: "border-t-2 border-r-2", ix:  60, iy: -60 },
    { cls: "bottom-5 left-5",  b: "border-b-2 border-l-2", ix: -60, iy:  60 },
    { cls: "bottom-5 right-5", b: "border-b-2 border-r-2", ix:  60, iy:  60 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.cls} w-14 h-14 border-[#00f0ff] pointer-events-none ${c.b}`}
          initial={{ opacity: 0, x: c.ix, y: c.iy }}
          animate={show ? { opacity: 0.75, x: 0, y: 0 } : { opacity: 0, x: c.ix, y: c.iy }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* ─── Side diagnostic panel ──────────────────────────────────────────────── */
function DiagPanel({
  rows,
  show,
  from,
}: {
  rows: { label: string; value: string }[];
  show: boolean;
  from: "left" | "right";
}) {
  return (
    <motion.div
      className="hidden lg:flex flex-col gap-2"
      initial={{ opacity: 0, x: from === "left" ? -40 : 40 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: from === "left" ? -40 : 40 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {rows.map(({ label, value }, i) => (
        <motion.div
          key={label}
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          <span className="text-[9px] font-mono text-[#00f0ff]/50 tracking-widest w-24 text-right">{label}</span>
          <span className="text-[9px] font-mono text-[#00f0ff] tracking-wider border border-[#00f0ff]/20 px-1.5 py-0.5 rounded-sm"
            style={{ textShadow: "0 0 6px rgba(0,240,255,0.7)" }}>
            {value}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Count-up percentage ────────────────────────────────────────────────── */
function CountUp({ active }: { active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    const start = Date.now();
    const dur = 720;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setN(Math.floor(p * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);
  return <span className="text-[11px] font-mono text-[#00f0ff] w-10 text-right tabular-nums">{n}%</span>;
}

/* ─── Charge bar ─────────────────────────────────────────────────────────── */
function ChargeBar({ active }: { active: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 w-full max-w-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 w-full">
        <span className="text-[9px] font-mono text-[#00f0ff]/60 tracking-[0.22em] shrink-0">POWER CHARGING</span>
        <div className="flex-1 h-1 bg-[#00f0ff]/10 rounded-full overflow-hidden border border-[#00f0ff]/15">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #00f0ff, #a0f8ff)", boxShadow: "0 0 8px #00f0ff" }}
            initial={{ width: 0 }}
            animate={active ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.72, ease: "easeInOut" }}
          />
        </div>
        <CountUp active={active} />
      </div>
    </motion.div>
  );
}

/* ─── Typewriter text block ──────────────────────────────────────────────── */
function TypeLines({ done: allDone, typed, current, phase }: {
  done: boolean; typed: string[]; current: string; phase: number;
}) {
  const isLastLine = (i: number) => i === LINES.length - 1;
  return (
    <div className="font-mono space-y-[4px] w-full max-w-[280px]">
      {typed.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: isLastLine(i) ? 16 : 11,
            fontWeight: isLastLine(i) ? 700 : 400,
            color: isLastLine(i) ? "#00f0ff" : "rgba(0,240,255,0.55)",
            letterSpacing: isLastLine(i) ? "0.18em" : "0.14em",
            textShadow: isLastLine(i) ? "0 0 16px rgba(0,240,255,0.9)" : "none",
          }}
        >
          {line}
        </motion.p>
      ))}

      {current && (
        <p
          style={{
            fontSize: typed.length === LINES.length - 1 ? 16 : 11,
            fontWeight: typed.length === LINES.length - 1 ? 700 : 400,
            color: typed.length === LINES.length - 1 ? "#00f0ff" : "rgba(0,240,255,0.55)",
            letterSpacing: "0.14em",
            textShadow: typed.length === LINES.length - 1 ? "0 0 16px rgba(0,240,255,0.9)" : "none",
          }}
        >
          {current}
          <span
            aria-hidden
            className="inline-block w-[0.45em] h-[1em] bg-current align-middle ml-[3px]"
            style={{ animation: "blink 0.55s step-end infinite" }}
          />
        </p>
      )}

      {/* "SYSTEMS ONLINE" big flash when all typed */}
      {allDone && phase >= 3 && phase < 5 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
          className="font-mono tracking-[0.22em] text-[#00f0ff] mt-3"
          style={{ fontSize: 11, textShadow: "0 0 10px rgba(0,240,255,0.8)" }}
        >
          ── SYSTEMS ONLINE ──
        </motion.p>
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function JarvisIntro() {
  const [show,         setShow]         = useState(false);
  const [phase,        setPhase]        = useState(0);
  const [done,         setDone]         = useState(false);
  const [typed,        setTyped]        = useState<string[]>([]);
  const [currentLine,  setCurrentLine]  = useState(-1);
  const [currentText,  setCurrentText]  = useState("");
  const [typingDone,   setTypingDone]   = useState(false);

  // Session check
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch { /* noop */ }
    setShow(true);
  }, []);

  // Phase state machine
  useEffect(() => {
    if (!show) return;
    setPhase(1);
  }, [show]);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 420);
      return () => clearTimeout(t);
    }
    if (phase === 2) {
      const t = setTimeout(() => { setPhase(3); setCurrentLine(0); }, 950);
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      const t = setTimeout(() => setPhase(5), 300);
      return () => clearTimeout(t);
    }
    if (phase === 5) {
      const t = setTimeout(() => setPhase(6), 850);
      return () => clearTimeout(t);
    }
    if (phase === 6) {
      const t = setTimeout(() => setDone(true), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // phase 3 → 4 when typing finishes
  useEffect(() => {
    if (typingDone && phase === 3) {
      const t = setTimeout(() => setPhase(4), 450);
      return () => clearTimeout(t);
    }
  }, [typingDone, phase]);

  // Typewriter
  useEffect(() => {
    if (phase !== 3 || currentLine < 0) return;
    if (currentLine >= LINES.length) {
      setTypingDone(true);
      return;
    }
    const text = LINES[currentLine];
    let char = 0;
    let cancelled = false;
    let id: ReturnType<typeof setTimeout>;

    const next = () => {
      if (cancelled) return;
      char++;
      setCurrentText(text.slice(0, char));
      if (char < text.length) {
        id = setTimeout(next, CHAR_MS);
      } else {
        const pause = currentLine === LINES.length - 1 ? LAST_PAUSE_MS : PAUSE_MS;
        id = setTimeout(() => {
          if (!cancelled) {
            setTyped((p) => [...p, text]);
            setCurrentText("");
            setCurrentLine((p) => p + 1);
          }
        }, pause);
      }
    };
    id = setTimeout(next, 0);
    return () => { cancelled = true; clearTimeout(id); };
  }, [phase, currentLine]);

  if (!show || done) return null;

  const contentAlpha = phase >= 6 ? 0 : 1;

  return (
    <>
      {/* Background panels (split on exit) */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9997]"
        style={{ height: "51vh", background: "#000000" }}
        animate={phase >= 6 ? { y: "-101%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[9997]"
        style={{ height: "51vh", background: "#000000" }}
        animate={phase >= 6 ? { y: "101%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      />

      {/* Full-screen content layer */}
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        animate={{ opacity: contentAlpha }}
        transition={{ duration: 0.25 }}
      >
        <Particles />

        {/* Faint grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,240,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Initial power flash */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(0,240,255,0.7) 0%, transparent 65%)" }}
          initial={{ opacity: 0 }}
          animate={phase === 1 ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
          transition={phase === 1 ? { duration: 0.4, times: [0, 0.2, 1] } : {}}
        />

        {/* Reactor exit flash */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(0,240,255,0.95) 0%, rgba(0,240,255,0.3) 35%, transparent 70%)" }}
          initial={{ opacity: 0 }}
          animate={phase >= 5 ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={phase >= 5 ? { duration: 0.55, times: [0, 0.22, 1] } : {}}
        />

        {/* Top & bottom status labels */}
        <motion.div
          className="absolute top-[22px] left-[80px] right-[80px] flex justify-between pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <span className="font-mono text-[8px] text-[#00f0ff]/50 tracking-[0.2em]">SYS : ONLINE</span>
          <span className="font-mono text-[8px] text-[#00f0ff]/50 tracking-[0.2em]">HUD : ACTIVE</span>
        </motion.div>
        <motion.div
          className="absolute bottom-[22px] left-[80px] right-[80px] flex justify-between pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <span className="font-mono text-[8px] text-[#00f0ff]/50 tracking-[0.2em]">LAT 18.52°N  LNG 73.86°E</span>
          <span className="font-mono text-[8px] text-[#00f0ff]/50 tracking-[0.2em]">STARK.AI v3.0</span>
        </motion.div>

        {/* HUD corner brackets */}
        <HudCorners show={phase >= 2} />

        {/* Horizontal scan line (sweeps once during assembly) */}
        {phase === 2 && (
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 h-px pointer-events-none z-10"
            style={{ background: "linear-gradient(90deg,transparent 5%,#00f0ff 50%,transparent 95%)", opacity: 0.65 }}
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.1, ease: "linear" }}
          />
        )}

        {/* Main 3-column layout: [left panel] [reactor+text] [right panel] */}
        <div className="relative flex items-center gap-8 lg:gap-14">
          <DiagPanel rows={LEFT_DATA}  show={phase >= 2} from="left"  />

          {/* Center column */}
          <div className="flex flex-col items-center gap-5">
            {/* Arc Reactor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.25 }}
              animate={
                phase >= 5
                  ? { opacity: 0, scale: 22 }
                  : phase >= 2
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.25 }
              }
              transition={
                phase >= 5
                  ? { duration: 0.38, ease: "easeIn" }
                  : { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }
              }
            >
              <ArcReactor phase={phase} />
            </motion.div>

            {/* Typewriter lines */}
            {phase >= 3 && (
              <TypeLines
                done={typingDone}
                typed={typed}
                current={currentText}
                phase={phase}
              />
            )}

            {/* Charge bar */}
            <ChargeBar active={phase === 4} />
          </div>

          <DiagPanel rows={RIGHT_DATA} show={phase >= 2} from="right" />
        </div>
      </motion.div>
    </>
  );
}
