import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import ProjectTile from "@/components/site/ProjectTile";
import { getProjects, getSite, getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: `${getWork().pageHeading} | ${getSite().studioName}`,
  description: getWork().pageIntro,
};

export default function WorkPage() {
  const work = getWork();
  const projects = getProjects();
  return (
    <PageShell>
      <section className="section page page-wide pad">
        <h2>{work.pageHeading}</h2>
        <p className="page-lead muted">{work.pageIntro}</p>
        <div className="work-grid">
          {projects.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>
        <p className="muted note">{work.note}</p>
      </section>
    </PageShell>
  );
}
