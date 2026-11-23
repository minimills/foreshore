import Link from "next/link";
import { img, type Project } from "@/lib/content";

/* Grey "wireframe" stand-in, used when a project has no cover image yet. */
export function SkeletonUi({ tall = 90 }: { tall?: number }) {
  return (
    <div className="ui">
      <div className="l" style={{ width: "40%" }} />
      <div
        className="b"
        style={{ height: tall, background: "linear-gradient(135deg,var(--bg-2),var(--leaf-soft))" }}
      />
      <div className="l" />
      <div className="l" style={{ width: "60%" }} />
      <div className="row3">
        <div className="b" />
        <div className="b" />
        <div className="b" />
      </div>
    </div>
  );
}

/* The cover image, cross-fading to the first screenshot on hover. */
export function ProjectScreen({ project }: { project: Project }) {
  if (!project.cover) return <SkeletonUi />;
  const second = project.screenshots[0];
  return (
    <div className="ui ui-img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(project.cover)} alt="" className="st-img" loading="lazy" />
      {second && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={img(second)} alt="" className="st-img st-end" loading="lazy" />
      )}
    </div>
  );
}

export const pillClass = (status: string) =>
  status.toLowerCase() === "live" ? "pill-offer" : "pill-concept";

type TileProps = {
  href: string;
  title: string;
  pill: string;
  pillClass: string;
  text: string;
  children: React.ReactNode;
};

export function Tile({ href, title, pill, pillClass, text, children }: TileProps) {
  const inner = (
    <>
      <div className="shot" aria-hidden="true">
        {children}
      </div>
      <div className="tile-meta">
        <span className="tile-title">{title}</span>
        {pill && <span className={`pill ${pillClass}`}>{pill}</span>}
      </div>
      <span className="muted tile-industry">{text}</span>
    </>
  );
  if (!href) return <div className="tile">{inner}</div>;
  if (href.startsWith("/")) {
    return (
      <Link className="tile" href={href}>
        {inner}
      </Link>
    );
  }
  return (
    <a className="tile" href={href} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}

export default function ProjectTile({ project }: { project: Project }) {
  return (
    <Tile
      href={project.liveUrl || project.demoUrl}
      title={project.title}
      pill={project.status}
      pillClass={pillClass(project.status)}
      text={project.summary}
    >
      <ProjectScreen project={project} />
    </Tile>
  );
}
