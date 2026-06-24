"use client";

import { motion } from "framer-motion";
import { RiBriefcaseLine } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";

const experience = [
  {
    role: "Frontend Developer Intern",
    company: "Company Name",
    period: "Jun 2024 – Aug 2024",
    points: [
      "Built and shipped X feature used by Y users.",
      "Reduced page load time by Z% via code splitting.",
      "Collaborated with design team to implement Figma mockups pixel-perfectly.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="Experience" />
      <div className="mt-10 space-y-10">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8 border-l border-border-accent"
          >
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />

            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <RiBriefcaseLine className="text-accent shrink-0" />
                {item.role}
              </h3>
              <span className="text-xs text-fg-muted border border-border px-2 py-0.5 rounded-full">
                {item.period}
              </span>
            </div>
            <p className="text-accent-alt text-sm font-medium mb-3">{item.company}</p>
            <ul className="space-y-1.5">
              {item.points.map((pt, j) => (
                <li key={j} className="text-fg-muted text-sm flex gap-2">
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
