"use client";

import { motion } from "framer-motion";
import { RiGraduationCapLine } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";

const education = [
  {
    degree: "Bachelor of Technology — Computer Science",
    institution: "University Name",
    period: "2021 – 2025",
    description: "Relevant coursework, achievements, or honours go here.",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="Education" />
      <div className="mt-10 space-y-6">
        {education.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8 border-l border-border-accent"
          >
            {/* Timeline dot */}
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />

            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <RiGraduationCapLine className="text-accent shrink-0" />
                {item.degree}
              </h3>
              <span className="text-xs text-fg-muted border border-border px-2 py-0.5 rounded-full">
                {item.period}
              </span>
            </div>
            <p className="text-accent-alt text-sm font-medium mb-1">{item.institution}</p>
            <p className="text-fg-muted text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
