"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Web Audio arc-reactor power-up synth ───────────────────────────────── */
function playArcReactorSound() {
  if (typeof window === "undefined") return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx() as AudioContext;
    const t = ctx.currentTime;

    // Rising sine sweep: 70 Hz → 660 Hz over 0.9 s
    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.connect(g1);
    g1.connect(ctx.destination);
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(70, t);
    osc1.frequency.exponentialRampToValueAtTime(660, t + 0.9);
    g1.gain.setValueAtTime(0, t);
    g1.gain.linearRampToValueAtTime(0.22, t + 0.1);
    g1.gain.setValueAtTime(0.22, t + 0.72);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    osc1.start(t);
    osc1.stop(t + 1.2);

    // Sawtooth hum that fades in at t+0.65 — simulates reactor stabilising
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.connect(g2);
    g2.connect(ctx.destination);
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(130, t + 0.65);
    g2.gain.setValueAtTime(0, t + 0.65);
    g2.gain.linearRampToValueAtTime(0.038, t + 0.8);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 1.55);
    osc2.start(t + 0.65);
    osc2.stop(t + 1.55);
  } catch {
    // AudioContext unavailable (SSR, blocked by browser, etc.)
  }
}

/* ─── Mini arc-reactor SVG ───────────────────────────────────────────────── */
function MiniArcReactor({ size = 22 }: { size?: number }) {
  const cx = 12, cy = 12, r1 = 10.5, r2 = 6.5, r3 = 2.5;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={cx} cy={cy} r={r1} stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <circle cx={cx} cy={cy} r={r2} stroke="currentColor" strokeWidth="0.75" opacity="0.8" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 - 30) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={cx + r2 * Math.cos(a)}
            y1={cy + r2 * Math.sin(a)}
            x2={cx + r1 * Math.cos(a)}
            y2={cy + r1 * Math.sin(a)}
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.45"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r3} fill="currentColor" opacity="0.75" />
    </svg>
  );
}

/* ─── Screen-wide glow overlay ───────────────────────────────────────────── */
function ArcReactorOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Radial tint emanating from footer (bottom-centre) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 115%, var(--accent-glow), transparent 65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, times: [0, 0.12, 0.72, 1] }}
      />

      {/* Three expanding concentric rings from bottom-centre */}
      {[0, 0.22, 0.44].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-accent"
          style={{
            width: 48,
            height: 48,
            bottom: 24,
            left: "50%",
            x: "-50%",
            y: "50%",
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 55, opacity: 0 }}
          transition={{ duration: 1.9, delay, ease: "easeOut" }}
        />
      ))}

      {/* Floating status message — centred on screen */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, times: [0, 0.14, 0.72, 1] }}
      >
        <div className="text-center px-6">
          <p className="font-mono font-bold text-accent text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-glow">
            ARC REACTOR: ONLINE
          </p>
          <p className="font-mono text-accent text-[11px] sm:text-xs opacity-55 tracking-[0.2em] mt-2">
            POWER OUTPUT: 3.0 GJ &nbsp;·&nbsp; CORE TEMP: 290 K
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [active, setActive] = useState(false);

  const trigger = () => {
    if (active) return;
    setActive(true);
    playArcReactorSound();
    // Auto-dismiss once all animations complete (~2.4 s)
    setTimeout(() => setActive(false), 2450);
  };

  return (
    <>
      <AnimatePresence>{active && <ArcReactorOverlay />}</AnimatePresence>

      <footer className="border-t border-border py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-fg-muted">

          {/* Left — copyright */}
          <span>© {new Date().getFullYear()} Suyash Dabholkar</span>

          {/* Centre — hidden arc reactor easter egg */}
          <motion.button
            onClick={trigger}
            title="..."
            aria-label="Easter egg"
            className="relative text-fg-muted hover:text-accent transition-colors duration-200 focus:outline-none group"
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            {/* Slow reactor rotation */}
            <motion.span
              className="block"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <MiniArcReactor size={22} />
            </motion.span>

            {/* Hover glow halo */}
            <span
              className="absolute inset-[-5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: "0 0 14px var(--accent)" }}
            />
          </motion.button>

          {/* Right — stack credit */}
          <span>Built with Next.js 14 &amp; Framer Motion</span>
        </div>
      </footer>
    </>
  );
}
