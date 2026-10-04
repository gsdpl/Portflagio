"use client";

import { ArrowDownToLine } from "lucide-react";
import { useState } from "react";

type CvOption = { label: string; file: string };

const CV_OPTIONS: Record<string, CvOption[]> = {
  fr: [
    { label: "CV Français", file: "/documents/cv-gaspard-duplaix.pdf" },
    { label: "CV Français simplifié", file: "/documents/cv-gaspard-duplaix-simple.pdf" },
    { label: "CV Anglais", file: "/documents/cv-gaspard-duplaix-en.pdf" },
    { label: "CV Anglais simplifié", file: "/documents/cv-gaspard-duplaix-en-simple.pdf" },
  ],
  en: [
    { label: "French CV", file: "/documents/cv-gaspard-duplaix.pdf" },
    { label: "French CV (simplified)", file: "/documents/cv-gaspard-duplaix-simple.pdf" },
    { label: "English CV", file: "/documents/cv-gaspard-duplaix-en.pdf" },
    { label: "English CV (simplified)", file: "/documents/cv-gaspard-duplaix-en-simple.pdf" },
  ],
};

export function CvDownload({ buttonLabel, locale }: { buttonLabel: string; locale: string }) {
  const options = CV_OPTIONS[locale] ?? CV_OPTIONS.en;
  const [selected, setSelected] = useState(0);

  return (
    <div className="cv-download">
      <select
        className="cv-select"
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
      >
        {options.map((opt, i) => (
          <option key={opt.file} value={i}>
            {opt.label}
          </option>
        ))}
      </select>
      <a className="button" href={options[selected].file} download>
        <ArrowDownToLine aria-hidden="true" />
        {buttonLabel}
      </a>
    </div>
  );
}
