"use client";

import { motion, useReducedMotion } from "motion/react";
import { MediaLightbox } from "@/components/media-lightbox";
import type { ProjectMedia } from "@/types/project";

export function ProjectGallery({
  media,
  alt,
  openLabel,
  closeLabel,
}: {
  media: ProjectMedia[];
  alt: string[];
  openLabel: string;
  closeLabel: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`project-gallery${
        media.every((image) => image.height > image.width)
          ? " project-gallery-portrait"
          : ""
      }`}
    >
      {media.map((image, index) => {
        const portrait = image.height > image.width;
        return (
        <motion.figure
          key={image.src}
          className={portrait ? "project-media-portrait" : "project-media-landscape"}
          initial={reduceMotion ? false : { y: 28 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <MediaLightbox
            image={image}
            alt={alt[index] ?? ""}
            openLabel={openLabel}
            closeLabel={closeLabel}
            triggerSizes={
              portrait
                ? "(max-width: 760px) 72vw, 380px"
                : "(max-width: 760px) 92vw, 880px"
            }
          />
          <figcaption>
            <span>0{index + 1}</span>
            {alt[index]}
          </figcaption>
        </motion.figure>
      )})}
    </div>
  );
}
