"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "fade" | "scale";

const VARIANTS: Record<RevealDirection, Variants> = {
  up:    { hidden: { opacity: 0, y: 40 },          visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 },         visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 40 },          visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -40 },         visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },                  visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 },    visible: { opacity: 1, scale: 1 } },
};

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Wraps children in a motion.div that animates into view on scroll.
 * Uses `once: true` so the animation only fires the first time.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
