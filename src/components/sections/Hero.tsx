"use client";

import { motion } from "framer-motion";
import { RiArrowDownLine } from "react-icons/ri";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-2xl"
      >
        <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm">
          Hello, I&apos;m
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-glow">
          Suyash
        </h1>
        <p className="text-xl md:text-2xl text-fg-muted">
          Full-Stack Developer &amp; Designer
        </p>
        <p className="text-fg-muted max-w-lg mx-auto">
          I build fast, accessible, and beautiful web experiences.
        </p>
        <div className="flex gap-4 justify-center pt-2">
          <a href="#projects" className="btn-accent px-6 py-3 rounded-lg font-medium">
            View Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-border-accent text-accent rounded-lg font-medium hover:shadow-glow transition-shadow"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 animate-bounce text-accent opacity-60"
        aria-label="Scroll down"
      >
        <RiArrowDownLine size={24} />
      </motion.a>
    </section>
  );
}
