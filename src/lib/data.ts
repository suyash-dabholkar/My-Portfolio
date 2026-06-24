/**
 * Single source of truth for all portfolio content.
 * Import from here in every section component.
 */

import type { IconType } from "react-icons";
import {
  RiMapPinLine,
  RiCpuLine,
  RiRobot2Line,
  RiMailLine,
  RiLinkedinLine,
  RiGithubLine,
} from "react-icons/ri";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiArduino,
  SiRaspberrypi,
  SiGit,
  SiGithub,
  SiLinux,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

/* ─── About ───────────────────────────────────────────────────────────────── */
export const ABOUT_STATS = [
  { value: "8.9",  label: "CGPA"         },
  { value: "4+",   label: "Projects"     },
  { value: "3",    label: "Clubs & Orgs" },
];

export interface AboutTag {
  icon: IconType;
  text: string;
}
export const ABOUT_TAGS: AboutTag[] = [
  { icon: RiMapPinLine, text: "VIT Vellore, India" },
  { icon: RiCpuLine,    text: "AI & ML"            },
  { icon: RiRobot2Line, text: "Robotics"           },
];

/* ─── Education ───────────────────────────────────────────────────────────── */
export interface EduEntry {
  id: string;
  type: "current" | "past";
  degree: string;
  institution: string;
  period: string;
  location?: string;
  status?: string;
  cgpa?: string;
  cgpaNum?: number;
  board?: string;
  score?: string;
  courses?: string[];
  highlights?: string[];
}

export const EDUCATION_ENTRIES: EduEntry[] = [
  {
    id: "vit",
    type: "current",
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    period: "2024 – Present",
    status: "2nd Year",
    cgpa: "8.9 / 10",
    cgpaNum: 89,
  },
];

/* ─── Experience (work / internships) ────────────────────────────────────── */
export type ExpLabel =
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Freelance"
  | "Contract"
  | "Leadership";

export interface ExpEntry {
  id: string;
  type: "current" | "past";
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  label: ExpLabel;
  stack: string[];
  points: string[];
}

export const EXPERIENCE_ENTRIES: ExpEntry[] = [
  {
    id: "disruptive-exchange",
    type: "current",
    role: "AI Solutions Intern",
    company: "Disruptive Exchange",
    location: "Hybrid – Mumbai",
    period: "May 2025 – Jul 2025",
    duration: "2 mos",
    label: "Internship",
    stack: ["Python", "Llama 3.2", "LoRA", "ChromaDB", "FastAPI", "Flask", "MySQL", "React"],
    points: [
      "Fine-tuned Llama 3.2 3B Instruct model using LoRA (r=32, α=64) on 1,690 Q&A pairs from 9 product manuals, improving accuracy from 69% (v1) to 76.9% (v2); RAG integration projected to reach 83–85% (v3).",
      "Built a RAG pipeline using ChromaDB and Sentence Transformers with optimized 150-word chunking and top-5 retrieval, significantly improving response relevance for domain-specific customer queries.",
      "Developed end-to-end deployment pipeline with FastAPI + Flask + MySQL backend, model inference served via Google Colab + ngrok, integrated into a web chatbot with decision tree flows and live-support escalation.",
    ],
  },
];

/* ─── Leadership (clubs & extracurriculars) ──────────────────────────────── */
export const LEADERSHIP_ENTRIES: ExpEntry[] = [
  {
    id: "robotics-club",
    type: "current",
    role: "Editorial Head & Senior Core Member",
    company: "Robotics Club",
    location: "VIT Vellore",
    period: "2024 – Present",
    duration: "~1 yr",
    label: "Leadership",
    stack: ["Technical Docs", "Robotics", "AI Integration", "Mentorship"],
    points: [
      "Led technical documentation and structured project reports for robotics initiatives.",
      "Mentored junior members in robotics development and AI integration.",
    ],
  },
  {
    id: "aiml-club",
    type: "past",
    role: "Senior Core Member",
    company: "AI/ML Club",
    location: "VIT Vellore",
    period: "2024 – Present",
    duration: "~1 yr",
    label: "Leadership",
    stack: ["Machine Learning", "AI Research", "Data Science", "Workshops"],
    points: [
      "Organized AI/ML technical sessions, workshops, and knowledge-sharing events.",
      "Collaborated on applied machine learning projects focused on AI and data science.",
    ],
  },
  {
    id: "toastmasters",
    type: "past",
    role: "Active Member",
    company: "Toastmasters International",
    location: "VIT Vellore",
    period: "2024 – Present",
    duration: "~1 yr",
    label: "Leadership",
    stack: ["Public Speaking", "Leadership Development", "Communication"],
    points: [
      "Active member focused on leadership development and structured public speaking.",
      "Competed in speech contests to enhance communication and presentation skills.",
    ],
  },
];

/* ─── Skills ──────────────────────────────────────────────────────────────── */
export interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}
export interface SkillCategory {
  id: string;
  label: string;
  skills: SkillItem[];
}

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python",     icon: SiPython,     color: "#3776AB" },
      { name: "C",          icon: SiC,          color: "#A8B9CC" },
      { name: "C++",        icon: SiCplusplus,  color: "#00599C" },
      { name: "Java",       icon: FaJava,       color: "#007396" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    id: "web",
    label: "Web",
    skills: [
      { name: "React",    icon: SiReact,       color: "#61DAFB" },
      { name: "HTML5",    icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS",      icon: SiCss,         color: "#1572B6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    skills: [
      { name: "TensorFlow",   icon: SiTensorflow,  color: "#FF6F00" },
      { name: "PyTorch",      icon: SiPytorch,     color: "#EE4C2C" },
      { name: "OpenCV",       icon: SiOpencv,      color: "#5C3EE8" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "NumPy",        icon: SiNumpy,       color: "#4DABCF" },
      { name: "Pandas",       icon: SiPandas,      color: "#150458" },
    ],
  },
  {
    id: "robotics",
    label: "Robotics",
    skills: [
      { name: "Arduino",      icon: SiArduino,     color: "#00979D" },
      { name: "Raspberry Pi", icon: SiRaspberrypi, color: "#A22846" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git",    icon: SiGit,    color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#e2e2e2" },
      { name: "Linux",  icon: SiLinux,  color: "#FCC624" },
    ],
  },
];

/* ─── Projects ────────────────────────────────────────────────────────────── */
export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  screenshot?: string;
  github: string;   // "#" = no public repo
  demo?: string;
  stack: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "evguardian",
    name: "EVGuardian",
    tagline: "Smart OBD AI vehicle health monitoring",
    description:
      "Predictive analytics pipeline processing real-time OBD-II vehicle diagnostics data. Implements anomaly detection algorithms to identify early signs of component failure and enable proactive maintenance alerts for EV owners.",
    github: "https://github.com/suyash-dabholkar/EVGuardian",
    stack: ["Python", "Machine Learning", "OBD-II", "Anomaly Detection", "IoT"],
  },
  {
    id: "crowd-pulse",
    name: "Crowd Pulse",
    tagline: "AI crowd stampede prediction system",
    description:
      "IoT-enabled safety system using Edge AI and computer vision for real-time crowd monitoring. Analyzes crowd density and movement patterns to detect anomalies and generate predictive alerts before escalation.",
    github: "https://github.com/suyash-dabholkar/Crowd-Pulse",
    stack: ["Python", "Edge AI", "OpenCV", "IoT", "Computer Vision"],
  },
  {
    id: "maze-solver",
    name: "Maze Solver Robot",
    tagline: "Autonomous multi-sensor embedded robot",
    description:
      "Multi-sensor embedded robotic system with ultrasonic and IR sensors. Implements path optimization and real-time navigation algorithms for fully autonomous maze solving.",
    github: "#",  // no public repo
    stack: ["Embedded C", "Arduino", "Ultrasonic Sensors", "IR Sensors", "Path Optimization"],
  },
  {
    id: "gesture-robot",
    name: "Gesture Robot",
    tagline: "Computer vision gesture-controlled robot",
    description:
      "Computer vision-based gesture recognition system using OpenCV and MediaPipe. Integrates gesture input with embedded hardware for real-time wireless robot control.",
    github: "https://github.com/suyash-dabholkar/Gesture-Controlled-Bot",
    stack: ["Python", "OpenCV", "MediaPipe", "Embedded Systems", "Wireless Control"],
  },
];

/* ─── Contact ─────────────────────────────────────────────────────────────── */
export interface ContactLink {
  id: string;
  icon: IconType;
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id:       "email",
    icon:     RiMailLine,
    label:    "Email",
    handle:   "suyashdabholkar.18@gmail.com",
    href:     "mailto:suyashdabholkar.18@gmail.com",
    external: false,
  },
  {
    id:       "linkedin",
    icon:     RiLinkedinLine,
    label:    "LinkedIn",
    handle:   "linkedin.com/in/suyash-dabholkar",
    href:     "https://linkedin.com/in/suyash-dabholkar",
    external: true,
  },
  {
    id:       "github",
    icon:     RiGithubLine,
    label:    "GitHub",
    handle:   "github.com/suyash-dabholkar",
    href:     "https://github.com/suyash-dabholkar",
    external: true,
  },
];
