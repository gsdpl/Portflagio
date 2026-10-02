import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: "light" | "card" | "lens";
  /**
   * Decorative node rendered as a direct child of the panel (sibling of the
   * padded content) — e.g. a BorderBeam that should trace the panel's edge.
   */
  overlay?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function GlassPanel<T extends ElementType = "div">({
  as,
  children,
  className,
  variant = "card",
  overlay,
  ...props
}: GlassPanelProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("glass-panel", `glass-panel-${variant}`, className)}
      {...props}
    >
      <div className="glass-panel-content">{children}</div>
      {overlay}
    </Component>
  );
}
