"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILLS_CATEGORIES, type SkillCategory, type SkillItem } from "@/lib/data";

type Category = SkillCategory;
const CATEGORIES = SKILLS_CATEGORIES;

/* ─── Individual skill chip ──────────────────────────────────────────────── */
function SkillChip({ skill, index }: { skill: SkillItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-default select-none"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderLeft: `3px solid ${skill.color}`,
        boxShadow: hovered
          ? `0 6px 22px ${skill.color}28, 0 0 0 1px ${skill.color}38`
          : "0 1px 6px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-3px)" : "translateY(0px)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Icon — wiggles + colorizes on hover */}
      <motion.div
        animate={hovered ? { rotate: [0, -8, 8, -4, 0] } : { rotate: 0 }}
        transition={{ duration: 0.35 }}
        style={{ flexShrink: 0 }}
      >
        <Icon
          size={19}
          style={{
            color: hovered ? skill.color : "var(--fg-muted)",
            filter: hovered ? `drop-shadow(0 0 5px ${skill.color})` : "none",
            transition: "color 0.2s ease, filter 0.2s ease",
          }}
        />
      </motion.div>

      <span
        className="text-[13px] font-medium leading-none whitespace-nowrap"
        style={{
          color: hovered ? "var(--fg)" : "var(--fg-muted)",
          transition: "color 0.2s ease",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ─── Category group ─────────────────────────────────────────────────────── */
function CategoryGroup({ category, indexOffset }: { category: Category; indexOffset: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-[5px] h-[5px] rotate-45 bg-accent shrink-0"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 6px var(--accent)" }}
        />
        <span className="text-[11px] font-mono tracking-[0.22em] text-accent uppercase">
          {category.label}
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(90deg, var(--border-accent) 0%, transparent 100%)",
            boxShadow: "0 0 4px var(--accent-glow)",
          }}
        />
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={indexOffset + i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Filter tab bar ─────────────────────────────────────────────────────── */
const ALL_ID = "all";

function TabBar({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  const tabs = [
    { id: ALL_ID, label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-8">
      {tabs.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="relative px-4 py-2 rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-200"
            style={{
              background: isActive ? "var(--accent)" : "var(--bg-card)",
              color: isActive ? "var(--bg)" : "var(--fg-muted)",
              border: `1px solid ${isActive ? "var(--accent)" : "var(--border-accent)"}`,
              boxShadow: isActive ? "0 0 14px var(--accent-glow)" : "none",
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {label}
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

  let acc = 0;
  const offsetMap: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    offsetMap[cat.id] = acc;
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-10"
          >
            {visible.map((cat) => (
              <CategoryGroup
                key={cat.id}
                category={cat}
                indexOffset={activeTab === ALL_ID ? offsetMap[cat.id] : 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
