import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Leadership from "@/components/sections/Leadership";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Hero has its own coordinated boot-sequence — no scroll wrapper needed */}
      <Hero />

      {/* Every section below the fold fades + slides up as it enters the viewport.
          The `fade` direction keeps the section's internal y-animations additive-free;
          each section's own child elements handle their staggered slide-ups independently. */}
      <ScrollReveal direction="fade" duration={0.6}>
        <About />
      </ScrollReveal>

      <ScrollReveal direction="fade" duration={0.6}>
        <Education />
      </ScrollReveal>

      <ScrollReveal direction="fade" duration={0.6}>
        <Experience />
      </ScrollReveal>

      <ScrollReveal direction="fade" duration={0.6}>
        <Leadership />
      </ScrollReveal>

      <ScrollReveal direction="fade" duration={0.6}>
        <Skills />
      </ScrollReveal>

      <ScrollReveal direction="fade" duration={0.6}>
        <Projects />
      </ScrollReveal>

      <ScrollReveal direction="fade" duration={0.6}>
        <Contact />
      </ScrollReveal>
    </>
  );
}
