"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps page content in a brief fade+lift animation on initial load.
 * Keeps the layout a server component while only this small wrapper is client-side.
 */
export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
