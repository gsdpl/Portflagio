"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import type { ProjectMedia } from "@/types/project";

export function MediaLightbox({
  image,
  alt,
  triggerSizes,
  openLabel,
  closeLabel,
}: {
  image: ProjectMedia;
  alt: string;
  triggerSizes: string;
  openLabel: string;
  closeLabel: string;
}) {
  const portrait = image.height > image.width;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="gallery-image-trigger"
          type="button"
          aria-label={`${alt}. ${openLabel}`}
        >
          <Image
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            sizes={triggerSizes}
          />
          <span className="gallery-expand" aria-hidden="true">
            <Maximize2 />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content
          className={`lightbox-content${portrait ? " lightbox-content-portrait" : ""}`}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Enlarged project image. Press Escape to close.
          </Dialog.Description>
          <div className="lightbox-image-shell">
            <Image
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              sizes="95vw"
              priority
            />
          </div>
          <Dialog.Close className="lightbox-close" aria-label={closeLabel}>
            <X aria-hidden="true" />
          </Dialog.Close>
          <p className="lightbox-caption">{alt}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
