export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon?: string;
  category: "frontend" | "backend" | "tools" | "other";
}

export interface NavLink {
  label: string;
  href: string;
}
