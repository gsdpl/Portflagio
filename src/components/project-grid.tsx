"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInkTransition } from "@/components/transition-provider";
import { threadFor } from "@/lib/threads";
import type { Locale, ProjectListItem, ProjectMedia } from "@/types/project";

const ENABLE_PROJECT_SOUND = false;
const SCREEN_INTERVAL_MS = 1800;

function ScreenCarousel({
  screens,
  active,
}: {
  screens: ProjectMedia[];
  active: boolean;
}) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active) {
      setIndex(0);
      timer.current = setInterval(
        () => setIndex((prev) => (prev + 1) % screens.length),
        SCREEN_INTERVAL_MS,
      );
    } else {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [active, screens.length]);

  if (!active) return <div className="project-card-screens" />;

  return (
    <div className="project-card-screens">
      {screens.map((screen, i) => (
        <Image
          key={screen.src}
          src={screen.src}
          alt=""
          width={screen.width}
          height={screen.height}
          className={i === index ? "active" : ""}
          loading="lazy"
          sizes="(max-width: 700px) 100vw, (max-width: 950px) 50vw, 33vw"
        />
      ))}
    </div>
  );
}

export function ProjectGrid({
  locale,
  projects,
  viewProjectLabel,
}: {
  locale: Locale;
  projects: ProjectListItem[];
  viewProjectLabel: string;
}) {
  const startInk = useInkTransition();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  function playSound(slug: string) {
    if (!ENABLE_PROJECT_SOUND) return;
    try {
      audioRef.current?.pause();
      const audio = new Audio(`/projects/sounds/${slug}.mp3`);
      audio.volume = 0.35;
      audioRef.current = audio;
      void audio.play().catch(() => {});
    } catch {
      /* autoplay blocked or asset missing */
    }
  }

  return (
    <div className="project-grid">
      {projects.map((project, index) => {
        const thread = threadFor(index);
        const href = `/${locale}/projects/${project.slug}`;
        const isHovered = hoveredSlug === project.slug;
        return (
          <article
            key={project.slug}
            className="project-card"
            data-categories={project.categories.join(" ")}
            onMouseEnter={() => {
              setHoveredSlug(project.slug);
              playSound(project.slug);
            }}
            onMouseLeave={() => setHoveredSlug(null)}
            style={
              {
                "--accent": project.accent,
                "--accent-soft": project.accentSoft,
                "--thread-color": thread.color,
                "--thumb-filter": `url(#${thread.filter})`,
                "--logo-filter": `url(#${thread.logoFilter})`,
                "--card-thumb": `url(${project.thumbnail.src})`,
              } as React.CSSProperties
            }
          >
            <Link
              href={href}
              aria-label={`${viewProjectLabel}: ${project.title}`}
              onTouchStart={() => playSound(project.slug)}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey ||
                  event.button !== 0
                ) {
                  return;
                }
                event.preventDefault();
                startInk({
                  image: `/projects/scenes/${project.slug}.png`,
                  href,
                  title: project.title,
                  accent: project.accent,
                });
              }}
            >
              <div className="project-card-media">
                <Image
                  className="card-thumb-logo"
                  src={project.thumbnail.src}
                  alt=""
                  width={project.thumbnail.width}
                  height={project.thumbnail.height}
                  unoptimized={project.thumbnail.src.endsWith(".svg")}
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 700px) 100vw, (max-width: 950px) 50vw, 33vw"
                />
                <ScreenCarousel screens={project.gallery} active={isHovered} />
                <span className="project-card-year">{project.year}</span>
              </div>
              <div className="project-card-copy">
                <h3 className="project-card-title">{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-card-foot">
                  <span className="project-card-tags">{project.kicker}</span>
                  <span className="project-card-link">
                    {viewProjectLabel}
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
