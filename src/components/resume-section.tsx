import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { BrandEmblem } from "@/components/brand-emblem";
import { GlassPanel } from "@/components/glass/glass-panel";
import { Lettrine } from "@/components/lettrine";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/project";

export function ResumeSection({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const resume = resumeData[locale];

  return (
    <section className="resume-section" id="cv" aria-labelledby="resume-title">
      <div className="resume-scene" aria-hidden="true">
        <span className="paper-burn resume-burn resume-burn-left" />
        <span className="paper-burn resume-burn resume-burn-right" />
        <BrandEmblem tone="ornament" className="resume-background-emblem" />
      </div>

      <header className="resume-heading">
        <div>
          <span className="section-index">02</span>
        </div>
        <h2 id="resume-title">
          <Lettrine letter={resume.title.slice(0, 1)} />
          {resume.title.slice(1)}
        </h2>
      </header>

      <GlassPanel className="resume-intro-card" variant="lens">
        <div className="resume-portrait-shell">
          <Image
            src="/brand/gaspard-photo.png"
            alt={dictionary.resume.portraitAlt}
            width={121}
            height={121}
            sizes="(max-width: 700px) 180px, 250px"
          />
        </div>
        <div className="resume-intro-copy">
          <p>{resume.introduction}</p>
          <p className="resume-availability">
            <Sparkles aria-hidden="true" />
            {resume.availability}
          </p>
          <div className="resume-contact-line">
            <span>
              <MapPin aria-hidden="true" />
              {resume.location}
            </span>
            <a href={`mailto:${resume.email}`}>
              <Mail aria-hidden="true" />
              {resume.email}
            </a>
          </div>
          <Button asChild>
            <a href="/documents/cv-gaspard-duplaix.pdf" download>
              <ArrowDownToLine aria-hidden="true" />
              {dictionary.resume.download}
            </a>
          </Button>
        </div>
      </GlassPanel>

      <div className="resume-body">
        <section className="resume-experience" aria-labelledby="experience-title">
          <div className="resume-subheading">
            <BriefcaseBusiness aria-hidden="true" />
            <h3 id="experience-title">{dictionary.resume.experience}</h3>
          </div>
          <div className="resume-timeline">
            {resume.experiences.map((experience, index) => (
              <GlassPanel
                as="article"
                className="resume-timeline-item"
                variant="light"
                key={experience.company}
              >
                <span className="timeline-index">0{index + 1}</span>
                <div className="timeline-meta">
                  <span>{experience.period}</span>
                  <span>{experience.location}</span>
                </div>
                <h4>{experience.company}</h4>
                <p className="timeline-role">{experience.role}</p>
                <p className="timeline-context">{experience.context}</p>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        </section>

        <aside className="resume-aside">
          <GlassPanel className="resume-info-card" variant="card">
            <div className="resume-subheading">
              <GraduationCap aria-hidden="true" />
              <h3>{dictionary.resume.education}</h3>
            </div>
            {resume.education.map((education) => (
              <div className="education-item" key={education.school}>
                <span>{education.period}</span>
                <h4>{education.school}</h4>
                <p>{education.credential}</p>
                <ul>
                  {education.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </GlassPanel>

          <GlassPanel className="resume-info-card" variant="card">
            <div className="resume-subheading">
              <Sparkles aria-hidden="true" />
              <h3>{dictionary.resume.skills}</h3>
            </div>
            <div className="resume-pills">
              {resume.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="resume-info-card resume-mini-grid" variant="card">
            <div>
              <div className="resume-subheading">
                <Languages aria-hidden="true" />
                <h3>{dictionary.resume.languages}</h3>
              </div>
              <ul>
                {resume.languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="resume-subheading">
                <Sparkles aria-hidden="true" />
                <h3>{dictionary.resume.passions}</h3>
              </div>
              <ul>
                {resume.passions.map((passion) => (
                  <li key={passion}>{passion}</li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        </aside>
      </div>

      <GlassPanel className="resume-contact-panel" variant="lens">
        <div>
          <span className="section-index">03</span>
          <h2>
            <Lettrine letter={dictionary.resume.contactTitle.slice(0, 1)} />
            {dictionary.resume.contactTitle.slice(1)}
          </h2>
          <p>{dictionary.resume.contactBody}</p>
        </div>
        <div className="contact-actions">
          <Button asChild>
            <a href={`mailto:${resume.email}`}>
              <Mail aria-hidden="true" />
              {dictionary.email}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://www.linkedin.com/in/gaspard-duplaix-17347b23b/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </GlassPanel>
    </section>
  );
}
