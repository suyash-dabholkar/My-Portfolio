"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILLS_CATEGORIES, type SkillCategory, type SkillItem } from "@/lib/data";

// Re-export the shared types as local aliases so the rest of the file is unchanged
type Category = SkillCategory;
const CATEGORIES = SKILLS_CATEGORIES;

/* ─── Hex geometry ───────────────────────────────────────────────────────── */
// flat-top regular hexagon — all 6 sides ≈ equal at w:92 h:80
const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const CARD_W = 92;
const CARD_H = 80;

/* ─── Individual hex card ────────────────────────────────────────────────── */
function HexCard({ skill, delay }: { skill: SkillItem; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.55, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, delay, ease: [0.34, 1.56, 0.64, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative shrink-0 cursor-default select-none"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* Outer hex — border layer; glows on hover */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: HEX,
          background: hovered ? "var(--accent)" : "var(--border-accent)",
          filter: hovered
            ? "drop-shadow(0 0 6px var(--accent)) drop-shadow(0 0 18px var(--accent-glow))"
            : "none",
          transition: "background 0.22s ease, filter 0.22s ease",
        }}
      />

      {/* Inner hex — card background */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          inset: "2px",
          clipPath: HEX,
          gap: "5px",
          background: hovered ? "var(--bg-secondary)" : "var(--bg-card)",
          transition: "background 0.22s ease",
        }}
      >
        <Icon
          size={26}
          style={{
            color: hovered ? skill.color : "var(--fg-muted)",
            transition: "color 0.22s ease",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: hovered ? "var(--fg)" : "var(--fg-muted)",
            transition: "color 0.22s ease",
            fontSize: "9.5px",
            fontWeight: 500,
            lineHeight: 1.2,
            textAlign: "center",
            maxWidth: "68px",
          }}
        >
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Category grid ──────────────────────────────────────────────────────── */
function CategoryGrid({
  category,
  startOffset,
}: {
  category: Category;
  startOffset: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2 h-2 rotate-45 bg-accent shrink-0" />
        <span className="text-[10px] font-mono tracking-[0.2em] text-fg-muted uppercase">
          {category.label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-border-accent to-transparent" />
      </div>

      {/* Hex grid */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <HexCard
            key={skill.name}
            skill={skill}
            delay={startOffset * 0.045 + i * 0.05}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Tab bar ────────────────────────────────────────────────────────────── */
const ALL_ID = "all";

function TabBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const tabs = [
    { id: ALL_ID, label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="flex flex-wrap gap-1 mt-8 border-b border-border pb-0">
      {tabs.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative px-4 py-2 text-[11px] font-mono tracking-wider uppercase transition-colors duration-200 ${
              isActive ? "text-accent" : "text-fg-muted hover:text-accent"
            }`}
          >
            {label}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-[-1px] inset-x-0 h-[2px] bg-accent"
                style={{ boxShadow: "0 0 6px var(--accent)" }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>(ALL_ID);

  const visible =
    activeTab === ALL_ID
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeTab);

  // Per-category stagger offsets (skill count accumulated)
  const offsets: Record<string, number> = {};
  let acc = 0;
  for (const cat of CATEGORIES) {
    offsets[cat.id] = acc;
    acc += cat.skills.length;
  }

  return (
    <section id="skills" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="Skills" />

      <TabBar active={activeTab} onChange={setActiveTab} />

      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-12"
          >
            {visible.map((cat) => (
              <CategoryGrid
                key={cat.id}
                category={cat}
                startOffset={activeTab === ALL_ID ? offsets[cat.id] : 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
