"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      // Only visible in dark mode; hidden by default
      className="pointer-events-none fixed top-0 left-0 z-[9990] hidden dark:block"
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        opacity: 0,
        background:
          "radial-gradient(circle, rgba(0,240,255,0.45) 0%, rgba(0,240,255,0.1) 50%, transparent 70%)",
        filter: "blur(2px)",
        willChange: "transform, opacity",
        transition: "opacity 0.15s ease",
      }}
    />
  );
}
