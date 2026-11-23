import Link from "next/link";
import TilesMarquee from "./TilesMarquee";
import ProjectTile, { ProjectScreen, Tile, SkeletonUi } from "./ProjectTile";
import { getProjects, getWork, type Project, type Work as WorkContent } from "@/lib/content";

function Featured({ project, work }: { project: Project; work: WorkContent }) {
  const href = project.liveUrl || project.demoUrl || "/#contact";
  const button = project.liveUrl
    ? work.featuredButtonLive
    : project.demoUrl
      ? work.featuredButtonDemo
      : work.featuredButtonOther;

  const inner = (
    <>
      <div className="featured-stage" aria-hidden="true">
        <div className="shot laptop">
          <ProjectScreen project={project} />
        </div>
        <div className="phone">
          <div className="phone-screen">
            <div className="l" style={{ width: "50%" }} />
            <div className="img" />
            <div className="l" />
            <div className="l" style={{ width: "70%" }} />
          </div>
        </div>
      </div>

      <div className="featured-copy">
        <span className="pill pill-offer" style={{ alignSelf: "flex-start" }}>
          {[project.type, project.status].filter(Boolean).join(" · ")}
        </span>
        <h3>{project.title}</h3>
        <p className="muted" style={{ lineHeight: 1.6 }}>
          {project.summary}
        </p>
        <span className="btn btn-ink" style={{ alignSelf: "flex-start" }}>
          {button}
        </span>
        {project.tags.length > 0 && (
          <p className="offer-note muted">{project.tags.join(" · ")}</p>
        )}
      </div>
    </>
  );

  return href.startsWith("/") ? (
    <Link className="featured" data-reveal="" href={href}>
      {inner}
    </Link>
  ) : (
    <a className="featured" data-reveal="" href={href} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}

export default function Work() {
  const work = getWork();
  const projects = getProjects();
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => p !== featured);

  const tiles = others.map((p) => <ProjectTile key={p.slug} project={p} />);
  if (work.inviteTile.show) {
    tiles.unshift(
      <Tile
        key="invite"
        href="/#contact"
        title={work.inviteTile.title}
        pill={work.inviteTile.label}
        pillClass="pill-offer"
        text={work.inviteTile.text}
      >
        <SkeletonUi />
      </Tile>
    );
  }

  return (
    <section id="work" className="work pad">
      <h2 data-reveal="">{work.heading}</h2>
      {featured && <Featured project={featured} work={work} />}
      {tiles.length > 0 && <TilesMarquee tiles={tiles} />}
      <p className="muted note" data-reveal="">
        {work.note}
      </p>
    </section>
  );
}
