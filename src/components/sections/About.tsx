"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiUserLine } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT_STATS, ABOUT_TAGS } from "@/lib/data";

/* ─── Profile card (holographic border + 3-D tilt + mouse shine) ─────────── */
function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]     = useState({ rx: 0, ry: 0 });
  const [shine, setShine]   = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr]  = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left)  / r.width;   // 0 → 1
    const ny = (e.clientY - r.top)   / r.height;
    setTilt({ rx: (ny - 0.5) * -16, ry: (nx - 0.5) * 16 });
    setShine({ x: nx * 100, y: ny * 100 });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  };

  return (
    /*
     * Wrapper: perspective so transform-style:preserve-3d works.
     * isolate creates a stacking context so -z-10 on holo-border-layer
     * stays behind the image but in front of the page background.
     */
    <div style={{ perspective: "900px" }}>
      <div
        ref={ref}
        className="holo-card relative isolate rounded-2xl cursor-default select-none"
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovered ? 1.025 : 1})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Animated holographic gradient border — sits behind via -z-10 */}
        <div className="holo-border-layer" />

        {/* Image area */}
        <div className="relative rounded-2xl overflow-hidden bg-bg-secondary aspect-[3/4]">

          {/* Actual photo — place yours at public/images/profile.jpg */}
          {!imgErr ? (
            <Image
              src="/images/profile.jpg"
              alt="Suyash Dabholkar"
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover object-top"
              onError={() => setImgErr(true)}
              priority
            />
          ) : (
            /* Styled placeholder shown when image is missing */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              {/* Scan-ring animation */}
              <div className="relative w-24 h-24">
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent opacity-20"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-[10px] rounded-full border border-accent opacity-30 flex items-center justify-center">
                  <RiUserLine size={36} className="text-accent opacity-50" />
                </div>
              </div>
              <p className="font-mono text-[9px] text-accent opacity-40 tracking-[0.22em]">
                PROFILE.JPG
              </p>
            </div>
          )}

          {/* Mouse-follow specular shine */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.11) 0%, transparent 62%)`,
            }}
          />

          {/* Bottom fade so image blends into the card */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-secondary/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading title="About Me" />

      <div className="mt-12 grid md:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-center">

        {/* Left — profile card */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-[340px] md:max-w-none"
        >
          <ProfileCard />
        </motion.div>

        {/* Right — bio + stats + tags */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="space-y-7"
        >
          {/* Bio */}
          <div className="space-y-4 text-fg-muted leading-relaxed">
            <p>
              I&apos;m{" "}
              <span className="text-fg font-semibold">Suyash Dabholkar</span>, a second-year
              B.Tech CSE student at VIT Vellore with deep interests in Artificial Intelligence,
              Machine Learning, Data Science, and Robotics.
            </p>
            <p>
              I focus on building real-world, data-driven solutions by combining intelligent
              software with hardware — turning ideas into prototypes that solve problems worth
              solving.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {ABOUT_STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="p-4 rounded-xl border border-border-accent bg-bg-card text-center"
              >
                <p className="text-2xl font-bold text-accent leading-none">{value}</p>
                <p className="text-[11px] text-fg-muted mt-1 leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick-fact tags */}
          <div className="flex flex-wrap gap-2">
            {ABOUT_TAGS.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-bg-secondary text-xs text-fg-muted"
              >
                <Icon size={12} className="text-accent shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
