"use client";

import { motion } from "framer-motion";
import {
  RiMailLine,
  RiLinkedinLine,
  RiGithubLine,
  RiArrowRightLine,
} from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const LINKS = [
  {
    id: "email",
    icon: RiMailLine,
    label: "Email",
    handle: "suyashdabholkar@gmail.com",
    href: "mailto:suyashdabholkar@gmail.com",
    external: false,
  },
  {
    id: "linkedin",
    icon: RiLinkedinLine,
    label: "LinkedIn",
    handle: "linkedin.com/in/suyashdabholkar",
    href: "https://linkedin.com/in/suyashdabholkar",
    external: true,
  },
  {
    id: "github",
    icon: RiGithubLine,
    label: "GitHub",
    handle: "github.com/suyashdabholkar",
    href: "https://github.com/suyashdabholkar",
    external: true,
  },
] as const;

/* ─── HUD link button ────────────────────────────────────────────────────── */
function LinkButton({
  link,
  index,
}: {
  link: (typeof LINKS)[number];
  index: number;
}) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -3 }}
      className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-bg-card hover:border-border-accent hover:shadow-glow transition-all duration-200 overflow-hidden"
    >
      {/* Left accent stripe — scales in vertically on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-200 rounded-r-full" />

      {/* Icon box — inverts on hover */}
      <div className="w-10 h-10 rounded-xl border border-border-accent bg-bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-200">
        <Icon
          size={18}
          className="text-accent group-hover:text-bg transition-colors duration-200"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[9px] font-mono tracking-[0.18em] text-fg-muted uppercase mb-[3px]">
          {link.label}
        </p>
        <p className="text-sm font-medium truncate">{link.handle}</p>
      </div>

      {/* Arrow — slides right on hover */}
      <RiArrowRightLine
        size={16}
        className="text-fg-muted group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-200 shrink-0"
      />
    </motion.a>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 max-w-2xl mx-auto text-center">
      <SectionHeading title="Contact" centered />

      {/* Availability status badge */}
      <motion.div
        className="mt-7 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#22c55e]/35 bg-[#22c55e]/8 text-[#22c55e] text-[10px] font-mono tracking-[0.14em]">
          <motion.span
            className="w-[6px] h-[6px] rounded-full bg-[#22c55e] shrink-0"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          AVAILABLE FOR OPPORTUNITIES
        </span>
      </motion.div>

      {/* Intro copy */}
      <motion.p
        className="mt-5 text-fg-muted text-sm sm:text-base leading-relaxed max-w-sm mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.18 }}
      >
        Let&apos;s build something great together. I&apos;m open to internships,
        full-time roles, and interesting side projects.
      </motion.p>

      {/* Separator */}
      <motion.div
        className="mt-8 mb-6 h-px bg-gradient-to-r from-transparent via-border-accent to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
      />

      {/* Link buttons */}
      <div className="space-y-3">
        {LINKS.map((link, i) => (
          <LinkButton key={link.id} link={link} index={i} />
        ))}
      </div>
    </section>
  );
}
