import type { Locale } from "@/types/project";

export type ResumeExperience = {
  company: string;
  context: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export type ResumeEducation = {
  school: string;
  credential: string;
  period: string;
  details: string[];
};

export type ResumeData = {
  locale: Locale;
  title: string;
  introduction: string;
  availability: string;
  location: string;
  email: string;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  languages: string[];
  passions: string[];
};
