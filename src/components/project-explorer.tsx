import { BrandEmblem } from "@/components/brand-emblem";
import { Lettrine } from "@/components/lettrine";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ProjectGrid } from "@/components/project-grid";
import { getDictionary } from "@/lib/i18n";
import type {
  Locale,
  ProjectCategory,
  ProjectListItem,
} from "@/types/project";

type Filter = "all" | ProjectCategory;

export function ProjectExplorer({
  locale,
  projects,
}: {
  locale: Locale;
  projects: ProjectListItem[];
}) {
  const dictionary = getDictionary(locale);
  const filters = Object.entries(dictionary.filters) as [Filter, string][];

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <span className="section-index">01</span>
          <h2 id="work-title">
            <Lettrine letter={dictionary.selected.slice(0, 1)} />
            {dictionary.selected.slice(1)}
          </h2>
        </div>
        <BrandEmblem tone="ornament" className="section-heading-emblem" />
        <p>{dictionary.selectedIntro}</p>
      </div>

      <div className="project-filter-shell">
        <div className="filters" aria-label={dictionary.selected}>
          {filters.map(([value, label]) => {
            const count =
              value === "all"
                ? projects.length
                : projects.filter((project) =>
                    project.categories.includes(value),
                  ).length;
            return (
              <label key={value}>
                <input
                  type="radio"
                  name="project-filter"
                  value={value}
                  defaultChecked={value === "all"}
                />
                {label}
                <span>
                  <NumberTicker
                    value={count}
                    className="text-inherit tracking-normal"
                  />
                </span>
              </label>
            );
          })}
        </div>

        <ProjectGrid
          locale={locale}
          projects={projects}
          viewProjectLabel={dictionary.viewProject}
        />
      </div>
    </section>
  );
}
