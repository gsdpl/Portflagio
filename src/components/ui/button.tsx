import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: "solid" | "outline" | "ghost";
};

export function Button({
  asChild,
  className,
  variant = "solid",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "button",
        variant === "outline" && "button-outline",
        variant === "ghost" && "button-ghost",
        className,
      )}
      {...props}
    />
  );
}
