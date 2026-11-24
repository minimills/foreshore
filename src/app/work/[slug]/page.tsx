import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import Sections from "@/components/site/Sections";
import Gallery from "@/components/site/Gallery";
import { getProjects, getSite, getWork, img } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

/* Every page here is built ahead of time, so letting it wait for its address costs
   nothing and keeps a real "not found" response for addresses that don't exist. */
export const instant = false;

/* One page per showcase project that has "Has its own page" ticked. */
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

function findProject(slug: string) {
  const project = getProjects().find((p) => p.slug === slug);
  return project?.hasPage ? project : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return { title: `${project.title} | ${getSite().studioName}`, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  const work = getWork();

  return (
    <PageShell>
      <article className="section page page-wide pad">
        <Link className="more page-back" href="/work">
          ← {work.projectBackLink}
        </Link>
        <span className="pill pill-offer page-pill">
          {[project.type, project.status].filter(Boolean).join(" · ")}
        </span>
        <h2>{project.title}</h2>
        <p className="page-lead muted">{project.summary}</p>
        {(project.liveUrl || project.demoUrl) && (
          <div className="page-actions">
            {project.liveUrl && (
              <a className="btn btn-ink" href={project.liveUrl} target="_blank" rel="noopener">
                {work.liveButton}
              </a>
            )}
            {project.demoUrl && (
              <a className="btn btn-outline" href={project.demoUrl} target="_blank" rel="noopener">
                {work.demoButton}
              </a>
            )}
          </div>
        )}

        {project.cover && (
          <div className="page-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(project.cover)} alt={`${project.title} screenshot`} />
          </div>
        )}

        <div className="page-body">
          <Sections sections={project.details} />
          <Gallery images={project.screenshots} heading={work.screenshotsHeading} />
          {project.tags.length > 0 && <p className="page-small muted">{project.tags.join(" · ")}</p>}
        </div>

        <div className="page-cta">
          <h3>{work.projectCtaHeading}</h3>
          <Link className="btn btn-ink" href="/#contact">
            {work.projectCtaButton}
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
