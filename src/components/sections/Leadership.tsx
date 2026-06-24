"use client";

import { LEADERSHIP_ENTRIES } from "@/lib/data";
import TimelineSection from "@/components/ui/TimelineSection";

export default function Leadership() {
  return (
    <TimelineSection
      entries={LEADERSHIP_ENTRIES}
      title="Leadership"
      sectionId="leadership"
    />
  );
}
