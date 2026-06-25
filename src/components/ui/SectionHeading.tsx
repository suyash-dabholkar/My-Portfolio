"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  centered = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={centered ? "text-center" : ""}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-fg heading-glow">{title}</h2>

      {/* Accent underline draws in after the heading settles */}
      <motion.div
        className={`mt-2 h-px w-12 bg-accent shadow-glow rounded-full ${
          centered ? "mx-auto" : ""
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ originX: centered ? 0.5 : 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
      />
    </motion.div>
  );
}
