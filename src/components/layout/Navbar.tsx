"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { navLinks } from "@/data/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const activeId = useScrollSpy(navLinks.map((l) => l.href.replace("#", "")));

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-border bg-bg/80">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-accent">
          Suyash.
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-accent link-accent ${
                  activeId === link.href.replace("#", "")
                    ? "text-accent"
                    : "text-fg-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md text-fg-muted hover:text-accent hover:bg-bg-secondary transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
        </button>
      </nav>
    </header>
  );
}
