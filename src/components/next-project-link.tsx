"use client";

import Link from "next/link";
import { useInkTransition } from "@/components/transition-provider";

export function NextProjectLink({
  href,
  slug,
  title,
  accent,
  children,
  style,
}: {
  href: string;
  slug: string;
  title: string;
  accent: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const startInk = useInkTransition();

  return (
    <Link
      className="next-project"
      href={href}
      style={style}
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
          image: `/projects/scenes/${slug}.png`,
          href,
          title,
          accent,
        });
      }}
    >
      {children}
    </Link>
  );
}
