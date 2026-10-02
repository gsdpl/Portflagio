import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandEmblem({
  className,
  tone = "ink",
  label,
}: {
  className?: string;
  tone?: "ink" | "ornament";
  label?: string;
}) {
  return (
    <span
      className={cn("brand-emblem", `brand-emblem-${tone}`, className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Image
        className="brand-emblem-layer brand-emblem-layer-base"
        src="/brand/emblem-source.svg"
        alt=""
        fill
        sizes="(max-width: 700px) 380px, 640px"
        unoptimized
      />
      {tone === "ornament" ? (
        <>
          <Image
            className="brand-emblem-layer brand-emblem-layer-paper"
            src="/brand/emblem-source.svg"
            alt=""
            fill
            sizes="(max-width: 700px) 380px, 640px"
            unoptimized
          />
          <Image
            className="brand-emblem-layer brand-emblem-layer-shadow"
            src="/brand/emblem-source.svg"
            alt=""
            fill
            sizes="(max-width: 700px) 380px, 640px"
            unoptimized
          />
        </>
      ) : null}
    </span>
  );
}
