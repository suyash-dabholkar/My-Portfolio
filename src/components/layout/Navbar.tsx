"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

/* ── Arc Reactor SVG ─────────────────────────────────────────────────────── */
function ArcReactor({ active }: { active: boolean }) {
  const cx = 18;
  const cy = 18;
  const ticks = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      viewBox="0 0 36 36"
      width="26"
      height="26"
      aria-hidden
      className={active ? "arc-reactor-pulse" : ""}
    >
      {/* Spinning outer ring with tick segments */}
      <g className={active ? "arc-reactor-ring" : ""}>
        <circle cx={cx} cy={cy} r="15.5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" />
        {ticks.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={cx + 12.5 * Math.cos(rad)}
              y1={cy + 12.5 * Math.sin(rad)}
              x2={cx + 15.5 * Math.cos(rad)}
              y2={cy + 15.5 * Math.sin(rad)}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Static middle ring */}
      <circle cx={cx} cy={cy} r="9.5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Inner triangle marks */}
      {[30, 150, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const ox = cx + 6.5 * Math.cos(rad);
        const oy = cy + 6.5 * Math.sin(rad);
        const ix = cx + 3.5 * Math.cos(rad);
        const iy = cy + 3.5 * Math.sin(rad);
        return (
          <line
            key={deg}
            x1={ox} y1={oy} x2={ix} y2={iy}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        );
      })}

      {/* Core — glows when active */}
      <circle
        cx={cx} cy={cy} r="4.5"
        fill="currentColor"
        fillOpacity={active ? "0.9" : "0.25"}
      />
      <circle
        cx={cx} cy={cy} r="2"
        fill={active ? "var(--bg)" : "currentColor"}
        fillOpacity={active ? "0.9" : "0.4"}
      />
    </svg>
  );
}

/* ── Hamburger → X icon ──────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-between w-5 h-[14px]">
      <motion.span
        className="block h-[1.5px] w-full rounded-full bg-current origin-left"
        animate={open ? { rotate: 45, y: -0.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
      />
      <motion.span
        className="block h-[1.5px] w-full rounded-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        className="block h-[1.5px] w-full rounded-full bg-current origin-left"
        animate={open ? { rotate: -45, y: 0.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
      />
    </span>
  );
}

/* ── Navbar ──────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer when viewport becomes desktop-wide
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-bg/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-bold text-xl tracking-tight text-accent shrink-0"
          >
            Suyash.
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5 text-[13px] font-medium">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-md flex items-center transition-colors ${
                      isActive ? "text-accent" : "text-fg-muted hover:text-accent"
                    }`}
                  >
                    {/* Sliding active pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-md bg-accent-glow border border-border-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Arc reactor theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className={`p-1.5 rounded-full text-accent transition-all duration-300 hover:bg-bg-secondary ${
                isDark ? "drop-shadow-[0_0_5px_var(--accent)]" : ""
              }`}
            >
              <ArcReactor active={isDark} />
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-md text-fg-muted hover:text-accent hover:bg-bg-secondary transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-black/50"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-0 top-16 z-50 md:hidden bg-bg/95 backdrop-blur-md border-b border-border"
            >
              <ul className="flex flex-col py-3 px-4">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeId === id;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "text-accent bg-accent-glow border border-border-accent"
                            : "text-fg-muted hover:text-accent hover:bg-bg-secondary"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all ${
                            isActive ? "bg-accent shadow-glow scale-125" : "bg-fg-muted"
                          }`}
                        />
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
