"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="Skills" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.05 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {skills.map((skill) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full border border-border-accent text-accent bg-bg-card text-sm font-medium hover:shadow-glow transition-shadow"
          >
            {skill.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
