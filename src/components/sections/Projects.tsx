"use client";

import { motion } from "framer-motion";
import { RiExternalLinkLine, RiGithubLine } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="Projects" />
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl border border-border bg-bg-card hover:border-accent hover:shadow-glow transition-all group"
          >
            <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
            <p className="text-fg-muted text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded border border-border-accent text-accent bg-bg-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-fg-muted hover:text-accent transition-colors"
                >
                  <RiGithubLine size={16} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-fg-muted hover:text-accent transition-colors"
                >
                  <RiExternalLinkLine size={16} /> Live
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
