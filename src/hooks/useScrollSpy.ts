"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(id);
          return;
        }
      }
      setActiveId("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
