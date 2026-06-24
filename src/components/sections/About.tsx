"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="About Me" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid md:grid-cols-2 gap-10 text-fg-muted"
      >
        <p>
          I&apos;m a passionate developer who loves turning ideas into real products. I focus on
          clean code, great UX, and shipping things that matter.
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
          open source, or brewing the perfect cup of coffee.
        </p>
      </motion.div>
    </section>
  );
}
