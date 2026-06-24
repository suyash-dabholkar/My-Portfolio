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
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group"
          >
            <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
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
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <RiGithubLine size={16} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
