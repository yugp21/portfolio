import { Github, Linkedin, Mail, Code2, Twitter, FileText } from "lucide-react";
import { LINKS } from "../data/links";

const ICONS = [
  { key: "github", label: "GitHub", href: LINKS.github, Icon: Github },
  { key: "linkedin", label: "LinkedIn", href: LINKS.linkedin, Icon: Linkedin },
  { key: "email", label: "Email", href: LINKS.email, Icon: Mail },
  { key: "leetcode", label: "LeetCode", href: LINKS.leetcode, Icon: Code2 },
  { key: "x", label: "X", href: LINKS.x, Icon: Twitter },
  { key: "resume", label: "Resume", href: LINKS.resume, Icon: FileText },
];

export default function SocialIcons({ size = 18 }) {
  return (
    <ul className="flex items-center gap-5">
      {ICONS.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full text-white/45 transition-colors duration-300 hover:text-[var(--accent)]"
          >
            <Icon size={size} strokeWidth={1.75} />
          </a>
        </li>
      ))}
    </ul>
  );
}