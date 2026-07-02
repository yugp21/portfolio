import { PROJECT_LINKS } from "./links";

export const CARDS = [
  {
    id: "intro",
    type: "intro",
    eyebrow: "",
    title: "Yug Patel",
    roleLine: "Full Stack Developer | Problem Solver | Learner",
    body: [
      "Building software that solves real-world problems.",
      "I enjoy building software that creates real-world impact. From small businesses to local communities, I want to build technology that makes everyday life a little better.",
    ],
  },
  {
    id: "techstack",
    type: "techstack",
    eyebrow: "Stack",
    title: "Tools of the trade",
    groups: [
      {
        label: "Languages",
        icon: "code",
        items: ["Java", "JavaScript", "HTML", "CSS"],
      },
      { label: "Frontend", icon: "layout", items: ["React", "Tailwind CSS"] },
      {
        label: "Backend",
        icon: "server",
        items: ["Spring Boot", "Spring Security", "Node.js", "Express.js"],
      },
      { label: "Database", icon: "database", items: ["PostgreSQL", "MongoDB"] },
      {
        label: "Tools",
        icon: "wrench",
        items: [
          "Git",
          "GitHub",
          "JWT",
          "Hibernate",
          "JPA",
          "Docker",
          "Postman",
          "Maven",
        ],
      },
    ],
  },
  {
    id: "projects",
    type: "projects",
    eyebrow: "Selected Work",
    title: "Projects",
    projects: [
      {
        name: "DukaanFlow",
        description:
          "A multi-tenant business management platform built for small businesses.",
        github: PROJECT_LINKS.dukaanFlow.github,
        live: PROJECT_LINKS.dukaanFlow.live,
      },
      {
        name: "Watchly",
        description:
          "Secure website monitoring with automated change detection and notifications.",
        github: PROJECT_LINKS.watchly.github,
      },
      {
        name: "Voxium",
        description:
          "A competitive online debate platform where users discuss diverse topics, earn titles, and rise through the ranks, inspired by the UFC.",
        github: PROJECT_LINKS.voxium.github,
      },
    ],
  },
  {
    id: "education",
    type: "education",
    eyebrow: "Education",
    title: "Education",
    items: [
      {
        degree: "B.Tech, Information Technology",
        school: "GCET",
        detail: "7th Semester · CGPA 8.45",
        period: "2023 — 2027",
        icon: "graduation-cap",
      },
      {
        degree: "Higher Secondary",
        school: "",
        detail: "71.07%",
        period: "2021 — 2023",
        icon: "book-open",
      },
    ],
  },
  {
    id: "about",
    type: "about",
    eyebrow: "About",
    title: "About Me",
    body: [
      "B.Tech IT student focused on building modern full-stack applications using Java, Spring Boot, React, and PostgreSQL.",
      "Outside of coding, you'll often find me reading philosophy, following combat sports and cricket, or practicing calisthenics.",
    ],
    quote: "The only thing I know is that I know nothing",
  },
  {
    id: "connect",
    type: "connect",
    eyebrow: "Get in touch",
    title: "Let's build something.",
    status: "Open to internships & freelance projects",
    prompt:
      "Have a project in mind, or just want to say hi? I'm always up for a good conversation.",
    footer: "Thank you for visiting.",
  },
];
