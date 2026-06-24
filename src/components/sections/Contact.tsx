"use client";

import { motion } from "framer-motion";
import { RiMailLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto text-center">
      <SectionHeading title="Get In Touch" centered />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-fg-muted max-w-md mx-auto"
      >
        I&apos;m open to new opportunities. Whether you have a question or just want to say hi,
        my inbox is always open.
      </motion.p>
      <motion.a
        href="mailto:hello@suyash.dev"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="btn-accent mt-8 inline-block px-8 py-3 rounded-lg font-medium"
      >
        Say Hello
      </motion.a>
      <div className="mt-10 flex justify-center gap-6 text-fg-muted">
        <a href="mailto:hello@suyash.dev" className="hover:text-accent transition-colors" aria-label="Email">
          <RiMailLine size={22} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="GitHub">
          <RiGithubLine size={22} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="LinkedIn">
          <RiLinkedinLine size={22} />
        </a>
      </div>
    </section>
  );
}
