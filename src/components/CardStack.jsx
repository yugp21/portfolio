import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimation } from "framer-motion";
import {
  Code,
  MonitorSmartphone,
  Server,
  Database,
  Wrench,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import PortfolioCard, {
  ENTER_FROM,
  CENTER,
  EXIT_LEFT,
  SPRING_SETTLE,
  SPRING_SNAPBACK,
  EASE_EXIT,
} from "./PortfolioCard";
import ProjectCard from "./ProjectCard";
import TechPill from "./TechPill";
import SocialIcons from "./SocialIcons";
import Footer from "./Footer";
import SummaryAnimation from "./SummaryAnimation";
import { CARDS } from "../data/cards";

const SWIPE_DISTANCE_THRESHOLD = 90;
const SWIPE_VELOCITY_THRESHOLD = 420;

const GROUP_ICONS = {
  code: Code,
  layout: MonitorSmartphone,
  server: Server,
  database: Database,
  wrench: Wrench,
};

const EDU_ICONS = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
};

function CardBody({ card }) {
  switch (card.type) {
    case "intro":
      return (
        <div className="space-y-5">
          {card.roleLine && (
            <p className="text-[13px] font-medium tracking-wide text-white/40">{card.roleLine}</p>
          )}
          {card.body.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-white/60">
              {p}
            </p>
          ))}
          <SocialIcons />
        </div>
      );

    case "techstack":
      return (
        <div className="space-y-5">
          {card.groups.map((group) => {
            const Icon = GROUP_ICONS[group.icon];
            return (
              <div key={group.label}>
                <div className="mb-2 flex items-center gap-1.5 text-white/30">
                  {Icon && <Icon size={12} strokeWidth={2} />}
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em]">
                    {group.label}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechPill key={item}>{item}</TechPill>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "projects":
      return (
        <div>
          {card.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      );

    case "about":
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4 text-[15px] leading-relaxed text-white/60">
            {card.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p
            className="mt-6 border-t pt-5 font-[var(--font-display)] text-[14px] italic leading-relaxed text-white/70"
            style={{ borderColor: "var(--card-border)" }}
          >
            “{card.quote}”
          </p>
        </div>
      );

    case "education":
      return (
        <div className="relative">
          {card.items.map((item, i) => {
            const Icon = EDU_ICONS[item.icon] ?? GraduationCap;
            const isLast = i === card.items.length - 1;
            return (
              <div key={item.degree} className="relative flex gap-5 pb-10 last:pb-0">
                {!isLast && (
                  <span
                    className="absolute left-[15px] top-9 w-px"
                    style={{
                      height: "calc(100% - 4px)",
                      background:
                        "linear-gradient(to bottom, var(--accent-glow), rgba(255,255,255,0.06))",
                    }}
                  />
                )}
                <span
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "var(--accent-soft)",
                    border: "1px solid var(--accent-glow)",
                  }}
                >
                  <Icon size={14} strokeWidth={1.75} style={{ color: "var(--accent)" }} />
                </span>
                <div className="pt-0.5">
                  {item.period && (
                    <p className="text-[11px] font-medium tracking-wide text-white/30">
                      {item.period}
                    </p>
                  )}
                  <p className="mt-1 text-[16px] font-medium text-white/85">{item.degree}</p>
                  {item.school && <p className="mt-0.5 text-[13px] text-white/40">{item.school}</p>}
                  <p className="mt-1.5 text-[13px] text-white/55">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      );

    case "connect":
      return (
        <div className="space-y-8">
          <p className="text-[15px] leading-relaxed text-white/60">{card.prompt}</p>

          {card.status && (
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium text-white/70"
              style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-glow)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "var(--ok)" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--ok)" }}
                />
              </span>
              {card.status}
            </div>
          )}

          <SocialIcons size={20} />

          <p className="text-[13px] text-white/35">{card.footer}</p>
        </div>
      );

    default:
      return null;
  }
}

export default function CardStack() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);

  const controls = useAnimation();
  const currentCard = CARDS[displayIndex];
  const isConnectCard = currentCard.type === "connect";

  const advance = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setHasSwipedOnce(true);

    await controls.start({ ...EXIT_LEFT, transition: EASE_EXIT });

    if (isConnectCard) {
      setShowSummary(true);
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    setDisplayIndex((i) => (i + 1) % CARDS.length);
    controls.set(ENTER_FROM);
    await controls.start({ ...CENTER, transition: SPRING_SETTLE });
    isAnimatingRef.current = false;
    setIsAnimating(false);
  }, [controls, isConnectCard]);

  const handleDragEnd = useCallback(
    (_event, info) => {
      const swipedLeft =
        info.offset.x < -SWIPE_DISTANCE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD;
      if (swipedLeft) {
        advance();
      } else {
        controls.start({ x: 0, rotate: 0, scale: 1, transition: SPRING_SNAPBACK });
      }
    },
    [advance, controls]
  );

  const pendingEntranceRef = useRef(false);

  useEffect(() => {
    controls.set(ENTER_FROM);
    controls.start({ ...CENTER, transition: SPRING_SETTLE });
  }, [controls]);

  const handleSummaryComplete = useCallback(() => {
    pendingEntranceRef.current = true;
    setShowSummary(false);
    setDisplayIndex(0);
  }, []);

  useEffect(() => {
    if (!showSummary && pendingEntranceRef.current) {
      pendingEntranceRef.current = false;
      controls.set(ENTER_FROM);
      controls.start({ ...CENTER, transition: SPRING_SETTLE });
    }
  }, [showSummary, controls]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {!showSummary && (
        <PortfolioCard
          eyebrow={currentCard.eyebrow}
          title={currentCard.title}
          controls={controls}
          onDragEnd={handleDragEnd}
          canDrag={!showSummary && !isAnimating}
        >
          <CardBody card={currentCard} />
        </PortfolioCard>
      )}

      {showSummary && <SummaryAnimation onComplete={handleSummaryComplete} />}

      {!showSummary && <Footer hasSwipedOnce={hasSwipedOnce} isConnectCard={isConnectCard} />}
    </div>
  );
}