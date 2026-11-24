"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import TilesMarquee from "./TilesMarquee";
import ProjectTile, { ProjectScreen, SkeletonUi, Tile } from "./ProjectTile";
import { projectHref, type Project } from "@/lib/format";
import type { Work } from "@/lib/content";

function featuredButton(p: Project, work: Work) {
  if (p.hasPage) return work.featuredButtonPage;
  if (p.liveUrl) return work.featuredButtonLive;
  if (p.demoUrl) return work.featuredButtonDemo;
  return work.featuredButtonOther;
}

/*
 * The big featured project plus the carousel underneath. Clicking a project
 * in the carousel swaps it into the big featured spot.
 */
export default function WorkShowcase({ projects, work }: { projects: Project[]; work: Work }) {
  const [selected, setSelected] = useState(
    () => (projects.find((p) => p.featured) ?? projects[0])?.slug
  );
  const featuredRef = useRef<HTMLAnchorElement>(null);
  const project = projects.find((p) => p.slug === selected);

  const choose = (slug: string) => {
    setSelected(slug);
    const el = featuredRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.5) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const tiles = projects.map((p) => (
    <ProjectTile
      key={p.slug}
      project={p}
      active={p.slug === selected}
      onClick={() => choose(p.slug)}
    />
  ));
  if (work.inviteTile.show) {
    tiles.push(
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

  const href = project ? projectHref(project) || "/#contact" : "/#contact";
  const external = !href.startsWith("/");

  return (
    <>
      {project && (
        <Link
          className="featured"
          data-reveal=""
          href={href}
          ref={featuredRef}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener" : undefined}
          aria-live="polite"
        >
          <div className="featured-stage featured-swap" aria-hidden="true" key={`stage-${project.slug}`}>
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

          <div className="featured-copy featured-swap" key={`copy-${project.slug}`}>
            <span className="pill pill-offer" style={{ alignSelf: "flex-start" }}>
              {[project.type, project.status].filter(Boolean).join(" · ")}
            </span>
            <h3>{project.title}</h3>
            <p className="muted" style={{ lineHeight: 1.6 }}>
              {project.summary}
            </p>
            <span className="btn btn-ink" style={{ alignSelf: "flex-start" }}>
              {featuredButton(project, work)}
            </span>
            {project.tags.length > 0 && (
              <p className="offer-note muted">{project.tags.join(" · ")}</p>
            )}
          </div>
        </Link>
      )}

      {tiles.length > 0 && <TilesMarquee tiles={tiles} />}
    </>
  );
}
