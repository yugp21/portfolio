import { ArrowUpRight, Github } from "lucide-react";

export default function ProjectCard({ project }) {
  const { name, description, github, live, status } = project;

  return (
    <div className="border-t py-5 first:border-t-0 first:pt-0" style={{ borderColor: "var(--card-border)" }}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="font-[var(--font-display)] text-[19px] tracking-tight text-white">
            {name}
          </h3>

          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-[13px] font-medium text-white/50 transition-colors hover:text-[var(--accent)]"
            >
              Live Demo
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-[13px] font-medium text-white/50 transition-colors hover:text-[var(--accent)]"
            >
              <Github size={13} strokeWidth={1.75} />
              GitHub
            </a>
          )}
        </div>

        {status && (
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-white/40">
            {status}
          </span>
        )}
      </div>

      <p className="mt-1.5 text-[14px] leading-relaxed text-white/50">{description}</p>
    </div>
  );
}