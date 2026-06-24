"use client";

import { EXPERIENCE_ENTRIES } from "@/lib/data";
import TimelineSection from "@/components/ui/TimelineSection";

export default function Experience() {
  return (
    <TimelineSection
      entries={EXPERIENCE_ENTRIES}
      title="Experience"
      sectionId="experience"
    />
  );
}
